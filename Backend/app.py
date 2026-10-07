from flask import Flask, jsonify, request
from flask_cors import CORS
from google import genai
from google.genai import errors, types
from dotenv import load_dotenv
import os
import requests
import tempfile
import base64

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

MURF_API_KEY = os.getenv("MURF_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not MURF_API_KEY or not GEMINI_API_KEY:
    raise RuntimeError("MURF_API_KEY and GEMINI_API_KEY must be set in Backend/.env")

def generate_speech(text,voice_id,locale):
    url = "https://global.api.murf.ai/v1/speech/stream"
    headers = {
        "api-key": MURF_API_KEY,
        "Content-Type": "application/json",
    }

    payload = {
        "text": text,
        "voiceId": voice_id,
        "model": "falcon-2",
        "locale": locale,
        "format": "MP3",
    }

    response = requests.post(url, json=payload, headers=headers, timeout=60)
    if not response.ok:
        raise RuntimeError(
            f"Murf API returned {response.status_code}: {response.text[:300]}"
        )

    content_type = response.headers.get("Content-Type", "")
    if not content_type.startswith("audio/"):
        raise RuntimeError(f"Murf returned a non-audio response: {content_type}")

    # Save audio to a temporary file
    temp_audio = tempfile.NamedTemporaryFile(suffix=".mp3", delete=False)
    temp_audio.write(response.content)
    temp_audio.close()

    return temp_audio.name


app = Flask(__name__)
CORS(app)
client = genai.Client(api_key=GEMINI_API_KEY)

PROMPTS = {
    "Summary": """
    Act as a friendly, knowledgeable tourist guide.

    Give a concise overview of "{place}" in {language}.

    Tone: warm, conversational, enthusiastic, and easy to understand.

    Mention:
    - Historical/cultural significance
    - Why it is famous
    - 1-2 key highlights

    Keep it around 120-150 words. Avoid unnecessary dates and details.

    Respond ONLY in {language}.
    """,

    "Balanced": """
    Act as a friendly, knowledgeable tourist guide.

    Give a moderately detailed explanation of "{place}" in {language}.

    Tone: warm, conversational, engaging, and informative. Explain like you are personally guiding a visitor, not reading from a textbook.

    Cover:
    - Brief historical background
    - Architectural or cultural highlights
    - Why it is important/famous
    - Interesting facts
    - What visitors should notice or experience

    Keep it around 200-250 words. Focus only on relevant information.

    Respond ONLY in {language}.
    """,

    "Detailed": """
    Act as a knowledgeable and passionate tourist guide.

    Give an immersive explanation of "{place}" in {language}.

    Tone: warm, conversational, enthusiastic, and storytelling-oriented.

    Cover:
    - Historical background and major developments
    - Architecture and unique features
    - Cultural significance and notable events
    - Interesting facts
    - Visitor insights and things worth noticing

    Use clear storytelling instead of listing facts. Be accurate and do not invent information.

    Keep it around 300-350 words.

    Respond ONLY in {language}.
    """
}

def generate_description(place, answer_type, language):
    prompt = PROMPTS[answer_type].format(place=place, language=language)
    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt
    )
    return response.text

def generate_text(prompt, image_bytes=None, mime_type=None):
    contents = prompt
    if image_bytes:
        contents = [
            prompt,
            types.Part.from_bytes(data=image_bytes, mime_type=mime_type)
        ]
    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=contents
    )
    return response.text

@app.route('/generate-audio-guide', methods=['POST'])
def generate_audio_guide():
    data = request.json
    place = data["place"]
    answer_type = data["answerType"]
    language = data["language"]
    voice_id = data["voiceId"]
    locale = data["locale"]

    description = generate_description(place, answer_type, language)
    try:
        audio_path = generate_speech(description, voice_id, locale)
    except (requests.RequestException, RuntimeError) as error:
        return jsonify({"description": description, "error": str(error)}), 502

    with open(audio_path, "rb") as audio_file:
        audio_base64 = base64.b64encode(audio_file.read()).decode("utf-8")

    return jsonify({"description": description, "audio": audio_base64})

@app.route('/ask-guide', methods=['POST'])
def ask_guide():
    data = request.get_json(silent=True) or {}
    place = str(data.get("place", "")).strip()
    question = str(data.get("question", "")).strip()
    context = str(data.get("context", "")).strip()
    language = str(data.get("language", "English")).strip()

    if not place or not question:
        return jsonify({"error": "A place and question are required."}), 400

    prompt = f"""
    You are a friendly, accurate tourist guide answering a visitor's question about "{place}".
    Answer in {language}, using the guide description below only as helpful context.
    Do not invent facts. Keep the answer conversational and under 120 words.

    Guide description:
    {context}

    Visitor question: {question}
    """
    try:
        return jsonify({"answer": generate_text(prompt)})
    except (errors.APIError, RuntimeError, ValueError, TypeError) as error:
        return jsonify({"error": f"Could not answer the question: {error}"}), 502

@app.route('/identify-place', methods=['POST'])
def identify_place():
    photo = request.files.get("photo")
    language = str(request.form.get("language", "English")).strip()
    allowed_types = {"image/jpeg", "image/png", "image/webp"}
    if not photo or photo.mimetype not in allowed_types:
        return jsonify({"error": "Please upload a JPEG, PNG, or WebP image."}), 400

    prompt = f"""
    Identify the landmark, building, or place shown in this image if possible.
    Respond in {language}.
    Respond in exactly two short paragraphs:
    1. Start with "This appears to be the [place]." If uncertain, clearly say that.
    2. Explain what makes it important, including its location and one notable
       historical, cultural, or architectural detail.
    Do not claim certainty when the image is ambiguous. Keep the response under 100 words.
    """
    try:
        description = generate_text(prompt, photo.read(), photo.mimetype)
        return jsonify({"description": description})
    except (errors.APIError, RuntimeError, ValueError, TypeError) as error:
        return jsonify({"error": f"Could not identify the photo: {error}"}), 502

@app.route('/nearby-places', methods=['POST'])
def nearby_places():
    data = request.get_json(silent=True) or {}
    try:
        latitude = float(data["latitude"])
        longitude = float(data["longitude"])
    except (KeyError, TypeError, ValueError):
        return jsonify({"error": "A valid latitude and longitude are required."}), 400

    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        return jsonify({"error": "The provided location is invalid."}), 400

    language = str(data.get("language", "English")).strip()
    query = f"""
    [out:json][timeout:20];
    (
      nwr(around:10000,{latitude},{longitude})["tourism"~"attraction|museum|gallery|zoo|theme_park|viewpoint|artwork"];
      nwr(around:10000,{latitude},{longitude})["historic"];
      nwr(around:10000,{latitude},{longitude})["amenity"="place_of_worship"];
    );
    out center tags;
    """
    elements = []
    service_error = None
    for endpoint in (
        "https://overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter"
    ):
        try:
            response = requests.post(
                endpoint,
                data=query,
                headers={"User-Agent": "TravelGuide/1.0"},
                timeout=30
            )
            response.raise_for_status()
            elements = response.json().get("elements", [])
            break
        except (requests.RequestException, ValueError) as error:
            service_error = error

    if service_error is not None and not elements:
        return jsonify({"error": f"Nearby places service failed: {service_error}"}), 502

    places = []
    seen_names = set()
    fallback_image = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    category_labels = {
        "Hindi": {
            "attraction": "पर्यटन स्थल", "museum": "संग्रहालय", "gallery": "कला दीर्घा",
            "zoo": "चिड़ियाघर", "viewpoint": "दृश्य स्थल", "historic": "ऐतिहासिक स्थल",
            "place_of_worship": "पूजा स्थल"
        },
        "Telugu": {
            "attraction": "పర్యాటక ప్రదేశం", "museum": "మ్యూజియం", "gallery": "కళా ప్రదర్శనశాల",
            "zoo": "జంతుప్రదర్శనశాల", "viewpoint": "దృశ్య ప్రదేశం", "historic": "చారిత్రక ప్రదేశం",
            "place_of_worship": "ఆరాధనా స్థలం"
        },
        "Tamil": {
            "attraction": "சுற்றுலா இடம்", "museum": "அருங்காட்சியகம்", "gallery": "கலைக்கூடம்",
            "zoo": "விலங்கியல் பூங்கா", "viewpoint": "காட்சித்தளம்", "historic": "வரலாற்று இடம்",
            "place_of_worship": "வழிபாட்டுத் தலம்"
        }
    }
    for element in elements:
        tags = element.get("tags", {})
        name = tags.get("name") or tags.get("name:en")
        if not name or name in seen_names:
            continue
        seen_names.add(name)
        category = tags.get("tourism") or tags.get("historic") or tags.get("amenity") or "attraction"
        if category == "yes":
            category = "historic"
        category_label = category_labels.get(language, {}).get(category, category.replace("_", " ").title())
        descriptions = {
            "Hindi": f"{name} आपके पास स्थित एक {category_label} है। इसके बारे में और जानने के लिए इसे देखें।",
            "Telugu": f"{name} మీకు సమీపంలోని {category_label}. దీని గురించి మరింత తెలుసుకోవడానికి సందర్శించండి.",
            "Tamil": f"{name} உங்கள் அருகிலுள்ள {category_label}. இதைப் பற்றி மேலும் அறிய பார்வையிடுங்கள்."
        }
        places.append({
            "name": name,
            "category": category_label,
            "description": descriptions.get(language, f"{name} is a {category.replace('_', ' ')} near your location. Explore it to learn more."),
            "image": fallback_image
        })
        if len(places) >= 12:
            break

    return jsonify({"language": language, "places": places})

app.run(host="127.0.0.1", port=5000, debug=False)
