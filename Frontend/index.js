// --- Constants ---
const VOICES = {
  English: { Male: "Matthew", Female: "Alicia" },
  Hindi: { Male: "Aman", Female: "Namrita" },
  Tamil: { Male: "Murali", Female: "Iniya" },
  Telugu: { Male: "Zion", Female: "Josie" }
};

const LOCALES = {
  English: "en-US",
  Hindi: "hi-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN"
};


// --- State ---
const state = {
  place: '',
  image: '',
  description: '',
  length: 'Summary',
  voice: 'Male'
};

// --- DOM Elements ---
const cardsContainer = document.querySelector('.cards');
const experiencePanel = document.getElementById('experience');
const previewTitle = document.getElementById('previewTitle');
const audioSection = document.getElementById('audioSection');
const audioPlayer = document.getElementById('audioPlayer');
const transcriptText = document.getElementById('scriptText');
const generateButton = document.getElementById('generateBtn');
const languageSelect = document.getElementById('selectLanguage');
const appLanguageSelect = document.getElementById('appLanguageSelect');
const navToggle = document.getElementById('navToggle');
const closeButton = document.getElementById('closeExperience');
const searchPreviewCard = document.getElementById('searchPreviewCard');
const searchPreviewImage = document.getElementById('searchPreviewImage');
const searchPreviewTitle = document.getElementById('searchPreviewTitle');
const transcriptToggle = document.getElementById('transcriptToggle');
const transcriptContent = document.getElementById('transcriptContent');
const transcriptArrow = document.getElementById('transcriptArrow');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');
const askGuideForm = document.getElementById('askGuideForm');
const guideQuestionInput = document.getElementById('guideQuestion');
const guidePlaceInput = document.getElementById('guidePlace');
const askGuideButton = document.getElementById('askGuideBtn');
const guideAnswer = document.getElementById('guideAnswer');
const askGuideContext = document.getElementById('askGuideContext');
const photoForm = document.getElementById('photoForm');
const photoInput = document.getElementById('photoInput');
const identifyButton = document.getElementById('identifyBtn');
const identificationResult = document.getElementById('identificationResult');
const nearbySearchButton = document.getElementById('nearbySearchBtn');
const nearbyStatus = document.getElementById('nearbyStatus');
const nearbyCards = document.getElementById('nearbyCards');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const appViews = document.querySelectorAll('.app-view');

const TRANSLATIONS = {
  English: {
    explorePlaces: 'Explore Places',
    askGuide: 'Ask the Guide',
    identifyExplain: 'Identify & Explain',
    nearbyPlaces: 'Nearby Places',
    nearbyTitle: 'Discover places near you',
    nearbyDescription: 'Allow location access to find tourist attractions nearby.',
    findNearby: 'Find Nearby Places',
    locating: 'Requesting your location...',
    nearbyLoading: 'Searching for nearby tourist places...',
    nearbyEmpty: 'No tourist places were found nearby.',
    nearbyError: 'Unable to find nearby places.',
    nearbyDistance: 'Nearby attraction',
    locationPermission: 'Location permission was denied. Please allow location access and try again.',
    locationTimeout: 'Location request timed out. Please try again.',
    locationSecureContext: 'Location access requires HTTPS or localhost. Open the app through a local web server and try again.',
    language: 'Language',
    searchDestination: 'Search destination...',
    explore: 'Explore',
    identifyDescription: 'Upload a landmark photo and let AI explain what you are seeing.',
    questionPrompt: 'Have a question about this place?',
    askGuideContext: 'Choose a place or generate a guide from Explore Places first, then ask a follow-up question here.',
    placePlaceholder: 'Which place is your question about?',
    askPlaceContext: 'Ask anything about {place}, including its history, architecture, or culture.',
    questionPlaceholder: 'Why was this temple built?',
    backToPlaces: 'Back to Places',
    ai: 'AI',
    guideReady: 'Guide Ready',
    durationDetail: 'Duration & Detail',
    summarized: 'Summarized',
    balanced: 'Balanced',
    detailed: 'Detailed',
    summaryTime: '~1 min overview',
    balancedTime: '~2 min guide',
    detailedTime: '~3 min guide',
    audioSettings: 'Audio Settings',
    male: 'Male',
    female: 'Female',
    generateAudioGuide: 'Generate Audio Guide',
    transcript: 'Transcript',
    read: 'Read',
    generating: '⏳ Generating Audio...',
    thinking: 'Thinking...',
    identifying: 'Identifying...',
    noDestination: 'No destination found for',
    noPhoto: 'Please choose a photo first.',
    listenAudio: 'Listen to Audio',
    searchResult: 'Search Result',
    destinationFound: 'Destination found via search.'
  },
  Hindi: {
    explorePlaces: 'स्थल देखें',
    askGuide: 'गाइड से पूछें',
    identifyExplain: 'पहचानें और समझें',
    nearbyPlaces: 'आस-पास के स्थल',
    nearbyTitle: 'अपने पास के स्थल खोजें',
    nearbyDescription: 'आस-पास के पर्यटन स्थलों को खोजने के लिए स्थान की अनुमति दें।',
    findNearby: 'आस-पास के स्थल खोजें',
    locating: 'आपका स्थान प्राप्त किया जा रहा है...',
    nearbyLoading: 'आस-पास के पर्यटन स्थल खोजे जा रहे हैं...',
    nearbyEmpty: 'आस-पास कोई पर्यटन स्थल नहीं मिला।',
    nearbyError: 'आस-पास के स्थल खोजे नहीं जा सके।',
    nearbyDistance: 'आस-पास का आकर्षण',
    locationPermission: 'स्थान की अनुमति नहीं मिली। कृपया अनुमति दें और फिर प्रयास करें।',
    locationTimeout: 'स्थान प्राप्त करने में समय लगा। कृपया फिर से प्रयास करें।',
    locationSecureContext: 'स्थान की अनुमति के लिए HTTPS या localhost आवश्यक है। ऐप को स्थानीय वेब सर्वर से खोलकर फिर प्रयास करें।',
    language: 'भाषा',
    searchDestination: 'गंतव्य खोजें...',
    explore: 'खोजें',
    identifyDescription: 'किसी स्थल की तस्वीर अपलोड करें और AI से उसके बारे में जानें।',
    questionPrompt: 'इस जगह के बारे में कोई सवाल है?',
    askGuideContext: 'स्थल चुनें या पहले स्थल देखें से गाइड बनाएं, फिर अपना सवाल पूछें।',
    placePlaceholder: 'आपका सवाल किस स्थल के बारे में है?',
    askPlaceContext: '{place} के इतिहास, वास्तुकला या संस्कृति के बारे में कुछ भी पूछें।',
    questionPlaceholder: 'यह मंदिर क्यों बनाया गया था?',
    backToPlaces: 'स्थलों पर वापस जाएं',
    ai: 'AI',
    guideReady: 'गाइड तैयार है',
    durationDetail: 'अवधि और विवरण',
    summarized: 'संक्षिप्त',
    balanced: 'संतुलित',
    detailed: 'विस्तृत',
    summaryTime: '~1 मिनट का सारांश',
    balancedTime: '~2 मिनट की गाइड',
    detailedTime: '~3 मिनट की गाइड',
    audioSettings: 'ऑडियो सेटिंग्स',
    male: 'पुरुष',
    female: 'महिला',
    generateAudioGuide: 'ऑडियो गाइड बनाएं',
    transcript: 'प्रतिलेख',
    read: 'पढ़ें',
    generating: '⏳ ऑडियो बनाया जा रहा है...',
    thinking: 'सोच रहा है...',
    identifying: 'पहचान की जा रही है...',
    noDestination: 'कोई स्थल नहीं मिला:',
    noPhoto: 'कृपया पहले एक तस्वीर चुनें।',
    listenAudio: 'ऑडियो सुनें',
    searchResult: 'खोज परिणाम',
    destinationFound: 'खोज के माध्यम से स्थल मिला।'
  },
  Telugu: {
    explorePlaces: 'ప్రదేశాలను చూడండి',
    askGuide: 'గైడ్‌ను అడగండి',
    identifyExplain: 'గుర్తించి వివరించండి',
    nearbyPlaces: 'సమీపంలోని ప్రదేశాలు',
    nearbyTitle: 'మీ దగ్గరలోని ప్రదేశాలను కనుగొనండి',
    nearbyDescription: 'సమీపంలోని పర్యాటక ప్రదేశాలను కనుగొనడానికి స్థాన అనుమతిని ఇవ్వండి.',
    findNearby: 'సమీపంలోని ప్రదేశాలను కనుగొనండి',
    locating: 'మీ స్థానాన్ని పొందుతోంది...',
    nearbyLoading: 'సమీపంలోని పర్యాటక ప్రదేశాలను వెతుకుతోంది...',
    nearbyEmpty: 'సమీపంలో పర్యాటక ప్రదేశాలు కనుగొనబడలేదు.',
    nearbyError: 'సమీపంలోని ప్రదేశాలను కనుగొనలేకపోయాము.',
    nearbyDistance: 'సమీప ఆకర్షణ',
    locationPermission: 'స్థాన అనుమతి నిరాకరించబడింది. అనుమతించి మళ్లీ ప్రయత్నించండి.',
    locationTimeout: 'స్థాన అభ్యర్థన సమయం ముగిసింది. మళ్లీ ప్రయత్నించండి.',
    locationSecureContext: 'స్థానాన్ని ఉపయోగించడానికి HTTPS లేదా localhost అవసరం. స్థానిక వెబ్ సర్వర్ ద్వారా యాప్‌ను తెరిచి మళ్లీ ప్రయత్నించండి.',
    language: 'భాష',
    searchDestination: 'గమ్యస్థానాన్ని వెతకండి...',
    explore: 'వెతకండి',
    identifyDescription: 'ప్రదేశం ఫోటోను అప్‌లోడ్ చేసి AI ద్వారా వివరాలను తెలుసుకోండి.',
    questionPrompt: 'ఈ ప్రదేశం గురించి ప్రశ్న ఉందా?',
    askGuideContext: 'ప్రదేశాన్ని ఎంచుకోండి లేదా ముందుగా ప్రదేశాలను చూడండి నుండి గైడ్‌ను రూపొందించి, తర్వాత ప్రశ్న అడగండి.',
    placePlaceholder: 'మీ ప్రశ్న ఏ ప్రదేశం గురించి?',
    askPlaceContext: '{place} చరిత్ర, నిర్మాణ శైలి లేదా సంస్కృతి గురించి ఏదైనా అడగండి.',
    questionPlaceholder: 'ఈ ఆలయాన్ని ఎందుకు నిర్మించారు?',
    backToPlaces: 'ప్రదేశాలకు తిరిగి వెళ్లండి',
    ai: 'AI',
    guideReady: 'గైడ్ సిద్ధంగా ఉంది',
    durationDetail: 'వ్యవధి మరియు వివరాలు',
    summarized: 'సంక్షిప్తం',
    balanced: 'సమతుల్యం',
    detailed: 'వివరణాత్మకం',
    summaryTime: '~1 నిమిషం అవలోకనం',
    balancedTime: '~2 నిమిషాల గైడ్',
    detailedTime: '~3 నిమిషాల గైడ్',
    audioSettings: 'ఆడియో సెట్టింగ్‌లు',
    male: 'పురుషుడు',
    female: 'స్త్రీ',
    generateAudioGuide: 'ఆడియో గైడ్‌ను రూపొందించండి',
    transcript: 'ప్రతిలేఖనం',
    read: 'చదవండి',
    generating: '⏳ ఆడియో రూపొందుతోంది...',
    thinking: 'ఆలోచిస్తోంది...',
    identifying: 'గుర్తిస్తోంది...',
    noDestination: 'ప్రదేశం కనుగొనబడలేదు:',
    noPhoto: 'దయచేసి ముందుగా ఫోటోను ఎంచుకోండి.',
    listenAudio: 'ఆడియో వినండి',
    searchResult: 'వెతుకులాట ఫలితం',
    destinationFound: 'వెతుకులాట ద్వారా ప్రదేశం కనుగొనబడింది.'
  },
  Tamil: {
    explorePlaces: 'இடங்களை ஆராயுங்கள்',
    askGuide: 'வழிகாட்டியிடம் கேளுங்கள்',
    identifyExplain: 'அடையாளம் கண்டு விளக்குங்கள்',
    nearbyPlaces: 'அருகிலுள்ள இடங்கள்',
    nearbyTitle: 'உங்களுக்கு அருகிலுள்ள இடங்களைக் கண்டறியுங்கள்',
    nearbyDescription: 'அருகிலுள்ள சுற்றுலா இடங்களைக் கண்டறிய இருப்பிட அனுமதியை வழங்குங்கள்.',
    findNearby: 'அருகிலுள்ள இடங்களைக் கண்டறி',
    locating: 'உங்கள் இருப்பிடம் பெறப்படுகிறது...',
    nearbyLoading: 'அருகிலுள்ள சுற்றுலா இடங்கள் தேடப்படுகின்றன...',
    nearbyEmpty: 'அருகில் சுற்றுலா இடங்கள் எதுவும் இல்லை.',
    nearbyError: 'அருகிலுள்ள இடங்களைக் கண்டறிய முடியவில்லை.',
    nearbyDistance: 'அருகிலுள்ள ஈர்ப்பு',
    locationPermission: 'இருப்பிட அனுமதி மறுக்கப்பட்டது. அனுமதித்து மீண்டும் முயற்சிக்கவும்.',
    locationTimeout: 'இருப்பிடக் கோரிக்கை நேரம் முடிந்தது. மீண்டும் முயற்சிக்கவும்.',
    locationSecureContext: 'இருப்பிட அணுகலுக்கு HTTPS அல்லது localhost தேவை. உள்ளூர் இணைய சேவையகம் மூலம் பயன்பாட்டைத் திறந்து மீண்டும் முயற்சிக்கவும்.',
    language: 'மொழி',
    searchDestination: 'இடத்தைத் தேடுங்கள்...',
    explore: 'தேடுங்கள்',
    identifyDescription: 'ஒரு இடத்தின் புகைப்படத்தைப் பதிவேற்றி AI மூலம் விளக்கம் பெறுங்கள்.',
    questionPrompt: 'இந்த இடத்தைப் பற்றி கேள்வி உள்ளதா?',
    askGuideContext: 'ஒரு இடத்தைத் தேர்ந்தெடுக்கவும் அல்லது முதலில் இடங்களை ஆராயுங்கள் பகுதியில் வழிகாட்டியை உருவாக்கி கேள்வி கேளுங்கள்.',
    placePlaceholder: 'உங்கள் கேள்வி எந்த இடத்தைப் பற்றி?',
    askPlaceContext: '{place} வரலாறு, கட்டிடக்கலை அல்லது கலாச்சாரம் பற்றி எதையும் கேளுங்கள்.',
    questionPlaceholder: 'இந்தக் கோவில் ஏன் கட்டப்பட்டது?',
    backToPlaces: 'இடங்களுக்குத் திரும்பு',
    ai: 'AI',
    guideReady: 'வழிகாட்டி தயார்',
    durationDetail: 'கால அளவு மற்றும் விவரம்',
    summarized: 'சுருக்கம்',
    balanced: 'சமநிலை',
    detailed: 'விரிவான',
    summaryTime: '~1 நிமிட சுருக்கம்',
    balancedTime: '~2 நிமிட வழிகாட்டி',
    detailedTime: '~3 நிமிட வழிகாட்டி',
    audioSettings: 'ஆடியோ அமைப்புகள்',
    male: 'ஆண்',
    female: 'பெண்',
    generateAudioGuide: 'ஆடியோ வழிகாட்டியை உருவாக்கு',
    transcript: 'எழுத்துப்படிவம்',
    read: 'படிக்கவும்',
    generating: '⏳ ஆடியோ உருவாக்கப்படுகிறது...',
    thinking: 'சிந்திக்கிறது...',
    identifying: 'அடையாளம் காணப்படுகிறது...',
    noDestination: 'இடம் கிடைக்கவில்லை:',
    noPhoto: 'முதலில் ஒரு புகைப்படத்தைத் தேர்ந்தெடுக்கவும்.',
    listenAudio: 'ஆடியோவைக் கேளுங்கள்',
    searchResult: 'தேடல் முடிவு',
    destinationFound: 'தேடல் மூலம் இடம் கண்டறியப்பட்டது.'
  }
};

const LANGUAGE_NAMES = {
  English: { English: 'English', Hindi: 'Hindi', Telugu: 'Telugu', Tamil: 'Tamil' },
  Hindi: { English: 'अंग्रेज़ी', Hindi: 'हिन्दी', Telugu: 'तेलुगु', Tamil: 'तमिल' },
  Telugu: { English: 'ఆంగ్లం', Hindi: 'హిందీ', Telugu: 'తెలుగు', Tamil: 'తమిళం' },
  Tamil: { English: 'ஆங்கிலம்', Hindi: 'இந்தி', Telugu: 'தெலுங்கு', Tamil: 'தமிழ்' }
};

const CARD_TRANSLATIONS = {
  English: {
    tajMahal: ['Taj Mahal', 'World Wonder', 'Agra', 'An immense mausoleum of white marble, built in Agra between 1631 and 1648.'],
    redFort: ['Red Fort', 'Historical Fort', 'New Delhi', 'A historic fort in Delhi that served as the main residence of the Mughal emperors.'],
    gatewayOfIndia: ['Gateway of India', 'Monument', 'Mumbai', 'An arch-monument built during the 20th century in Mumbai, India.'],
    hawaMahal: ['Hawa Mahal', 'Architecture', 'Jaipur', "The Palace of Winds, built with red and pink sandstone in Jaipur."],
    goldenTemple: ['Golden Temple', 'Spiritual', 'Amritsar', 'Sri Harmandir Sahib, the holiest Gurdwara of Sikhism.'],
    mysorePalace: ['Mysore Palace', 'Royal Palace', 'Mysore', 'A historic palace and royal residence in Karnataka.'],
    indiaGate: ['India Gate', 'War Memorial', 'New Delhi', 'A grand archway and national war memorial in the heart of New Delhi.'],
    qutubMinar: ['Qutub Minar', 'Historic Monument', 'New Delhi', "A UNESCO World Heritage Site and one of Delhi's iconic landmarks."],
    charminar: ['Charminar', 'Historic Monument', 'Hyderabad', 'A celebrated four-minaret monument and symbol of Hyderabad.']
  },
  Hindi: {
    tajMahal: ['ताजमहल', 'विश्व धरोहर', 'आगरा', 'आगरा में बना सफेद संगमरमर का विशाल मकबरा।'],
    redFort: ['लाल किला', 'ऐतिहासिक किला', 'नई दिल्ली', 'दिल्ली का ऐतिहासिक किला और मुगल सम्राटों का निवास।'],
    gatewayOfIndia: ['गेटवे ऑफ इंडिया', 'स्मारक', 'मुंबई', 'मुंबई में स्थित बीसवीं सदी का प्रसिद्ध स्मारक।'],
    hawaMahal: ['हवा महल', 'वास्तुकला', 'जयपुर', 'जयपुर में लाल और गुलाबी बलुआ पत्थर से बना हवाओं का महल।'],
    goldenTemple: ['स्वर्ण मंदिर', 'आध्यात्मिक स्थल', 'अमृतसर', 'सिख धर्म का पवित्र गुरुद्वारा श्री हरमंदिर साहिब।'],
    mysorePalace: ['मैसूर पैलेस', 'शाही महल', 'मैसूर', 'कर्नाटक में स्थित ऐतिहासिक महल और शाही निवास।'],
    indiaGate: ['इंडिया गेट', 'युद्ध स्मारक', 'नई दिल्ली', 'नई दिल्ली के बीचों-बीच बना राष्ट्रीय युद्ध स्मारक।'],
    qutubMinar: ['कुतुब मीनार', 'ऐतिहासिक स्मारक', 'नई दिल्ली', 'यूनेस्को विश्व धरोहर स्थल और दिल्ली का प्रसिद्ध स्मारक।'],
    charminar: ['चारमीनार', 'ऐतिहासिक स्मारक', 'हैदराबाद', 'हैदराबाद की पहचान बना चार मीनारों वाला प्रसिद्ध स्मारक।']
  },
  Telugu: {
    tajMahal: ['తాజ్ మహల్', 'ప్రపంచ అద్భుతం', 'ఆగ్రా', 'ఆగ్రాలో నిర్మించిన తెల్లని పాలరాతి సమాధి.'],
    redFort: ['ఎర్ర కోట', 'చారిత్రక కోట', 'న్యూఢిల్లీ', 'మొఘల్ చక్రవర్తుల నివాసంగా ఉన్న ఢిల్లీలోని చారిత్రక కోట.'],
    gatewayOfIndia: ['గేట్‌వే ఆఫ్ ఇండియా', 'స్మారకం', 'ముంబై', 'ముంబైలో ఉన్న ఇరవయ్యవ శతాబ్దపు ప్రసిద్ధ స్మారకం.'],
    hawaMahal: ['హవా మహల్', 'వాస్తుశిల్పం', 'జైపూర్', 'జైపూర్‌లో ఎరుపు, గులాబీ ఇసుకరాళ్లతో నిర్మించిన గాలుల మహల్.'],
    goldenTemple: ['గోల్డెన్ టెంపుల్', 'ఆధ్యాత్మిక ప్రదేశం', 'అమృత్‌సర్', 'సిక్కు మతానికి పవిత్రమైన శ్రీ హర్మందిర్ సాహిబ్.'],
    mysorePalace: ['మైసూర్ ప్యాలెస్', 'రాజభవనం', 'మైసూర్', 'కర్ణాటకలోని చారిత్రక రాజభవనం మరియు రాజ నివాసం.'],
    indiaGate: ['ఇండియా గేట్', 'యుద్ధ స్మారకం', 'న్యూఢిల్లీ', 'న్యూఢిల్లీ హృదయంలోని జాతీయ యుద్ధ స్మారకం.'],
    qutubMinar: ['కుతుబ్ మినార్', 'చారిత్రక స్మారకం', 'న్యూఢిల్లీ', 'యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం మరియు ఢిల్లీ చిహ్నం.'],
    charminar: ['చార్మినార్', 'చారిత్రక స్మారకం', 'హైదరాబాద్', 'హైదరాబాద్‌కు గుర్తింపుగా ఉన్న నాలుగు మినార్ల స్మారకం.']
  },
  Tamil: {
    tajMahal: ['தாஜ் மஹால்', 'உலக அதிசயம்', 'ஆக்ரா', 'ஆக்ராவில் கட்டப்பட்ட வெள்ளை பளிங்கு கல்லறை.'],
    redFort: ['செங்கோட்டை', 'வரலாற்றுக் கோட்டை', 'புது டெல்லி', 'முகலாய பேரரசர்களின் இல்லமாக இருந்த டெல்லியின் வரலாற்றுக் கோட்டை.'],
    gatewayOfIndia: ['இந்தியா நுழைவாயில்', 'நினைவுச்சின்னம்', 'மும்பை', 'மும்பையில் உள்ள இருபதாம் நூற்றாண்டின் புகழ்பெற்ற நினைவுச்சின்னம்.'],
    hawaMahal: ['ஹவா மஹால்', 'கட்டிடக்கலை', 'ஜெய்ப்பூர்', 'ஜெய்ப்பூரில் சிவப்பு மற்றும் இளஞ்சிவப்பு மணற்கற்களால் கட்டப்பட்ட காற்று மாளிகை.'],
    goldenTemple: ['தங்கக் கோவில்', 'ஆன்மீக இடம்', 'அமிர்தசரஸ்', 'சீக்கியர்களின் புனித குருத்வாரா ஸ்ரீ ஹர்மந்திர் சாஹிப்.'],
    mysorePalace: ['மைசூர் அரண்மனை', 'அரச அரண்மனை', 'மைசூர்', 'கர்நாடகத்தில் உள்ள வரலாற்றுச் சிறப்புமிக்க அரச அரண்மனை.'],
    indiaGate: ['இந்தியா கேட்', 'போர் நினைவுச்சின்னம்', 'புது டெல்லி', 'புது டெல்லியின் மையத்தில் உள்ள தேசிய போர் நினைவுச்சின்னம்.'],
    qutubMinar: ['குதுப் மினார்', 'வரலாற்றுச் சின்னம்', 'புது டெல்லி', 'யுனெஸ்கோ உலக பாரம்பரிய தளம் மற்றும் டெல்லியின் சின்னம்.'],
    charminar: ['சார்மினார்', 'வரலாற்றுச் சின்னம்', 'ஹைதராபாத்', 'ஹைதராபாத்தின் அடையாளமான நான்கு மினார்களைக் கொண்ட நினைவுச்சின்னம்.']
  }
};

function getSelectedLanguage() {
  return appLanguageSelect.value;
}

function setSelectedLanguage(language) {
  if (!TRANSLATIONS[language]) language = 'English';
  appLanguageSelect.value = language;
  languageSelect.value = language;
  localStorage.setItem('travelGuideLanguage', language);
  applyTranslations(language);
  if (nearbyCards.children.length > 0) findNearbyPlaces();
}

function applyTranslations(language) {
  const strings = TRANSLATIONS[language];
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = strings[element.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    element.title = strings[element.dataset.i18nTitle];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    element.placeholder = strings[element.dataset.i18nPlaceholder];
  });
  document.querySelectorAll('[data-card-key]').forEach(card => {
    const translation = CARD_TRANSLATIONS[language][card.dataset.cardKey];
    if (!translation) return;
    card.dataset.canonicalPlace = card.dataset.canonicalPlace || card.dataset.place;
    card.dataset.place = translation[0];
    card.querySelector('h3').textContent = translation[0];
    card.querySelector('span').textContent = translation[1];
    card.querySelector('.absolute.top-4').textContent = translation[2];
    card.querySelector('p').textContent = translation[3];
  });
  document.querySelectorAll('#appLanguageSelect option, #selectLanguage option').forEach(option => {
    option.textContent = LANGUAGE_NAMES[language][option.value];
  });
  if (state.description && state.place) {
    askGuideContext.textContent = strings.askPlaceContext.replace('{place}', state.place);
  }
}

function text(key) {
  return TRANSLATIONS[getSelectedLanguage()][key];
}

setSelectedLanguage(localStorage.getItem('travelGuideLanguage') || 'English');

// --- Functions ---

function selectDestination(place, image, clickedCard = null) {
  state.place = place;
  guidePlaceInput.value = place;
  state.image = image;

  // Update UI content
  previewTitle.textContent = place;
  cardsContainer.classList.add('faded');

  // Reset previous states
  document.querySelectorAll('.place-card').forEach(card => card.classList.remove('active'));
  searchPreviewCard.classList.add('hidden');

  // Handle Card Visibility
  if (clickedCard) {
    clickedCard.classList.add('active');
  } else {
    // If it's a search result, show the preview card
    searchPreviewImage.src = image;
    searchPreviewImage.alt = place;
    searchPreviewTitle.textContent = place;
    searchPreviewCard.classList.remove('hidden');
    searchPreviewCard.classList.add('active');
  }

  // Reset Audio Panel
  audioSection.classList.add('hidden');
  audioPlayer.src = '';
  transcriptText.textContent = '';
  state.description = '';
  guideAnswer.textContent = '';
  guideAnswer.classList.add('hidden');
  guideQuestionInput.value = '';
  generateButton.textContent = text('generateAudioGuide');
  generateButton.disabled = false;

  // Show Panel with animation
  experiencePanel.classList.remove('hidden');
  setTimeout(() => {
    experiencePanel.classList.add('visible');
  }, 10);
}

function deselectDestination() {
  experiencePanel.classList.remove('visible');

  // Wait for animation to finish before hiding
  setTimeout(() => {
    experiencePanel.classList.add('hidden');
    cardsContainer.classList.remove('faded');
    searchPreviewCard.classList.add('hidden');
    document.querySelectorAll('.place-card').forEach(card => card.classList.remove('active'));
  }, 300);
}

function searchDestinations() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchPreviewCard.classList.add('hidden');
    cardsContainer.classList.remove('faded');
    document.querySelectorAll('.place-card:not(.search-preview-card)').forEach(card => {
      card.classList.remove('hidden');
    });
    return;
  }

  const destinationCards = [...document.querySelectorAll('.place-card:not(.search-preview-card)')];
  const matchingCard = destinationCards.find(card =>
    card.dataset.place.toLowerCase() === query
  ) || destinationCards.find(card => card.textContent.toLowerCase().includes(query));

  if (!matchingCard) {
    alert(`${text('noDestination')} "${searchInput.value.trim()}".`);
    return;
  }

  selectDestination(
    matchingCard.dataset.place,
    matchingCard.dataset.image
  );
}

function showView(viewId) {
  appViews.forEach(view => view.classList.toggle('hidden', view.id !== viewId));
  sidebarLinks.forEach(link => link.classList.toggle('active', link.dataset.viewTarget === viewId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function createNearbyCard(place) {
  const card = document.createElement('div');
  card.className = 'place-card bg-white rounded-[2rem] overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:border-orange-100 group relative';
  card.innerHTML = `
    <div class="overflow-hidden h-[200px] relative">
      <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
      <img src="${place.image}" alt="${place.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
      <div class="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-gray-800 shadow-sm">${place.category || text('nearbyDistance')}</div>
    </div>
    <div class="p-6">
      <span class="text-[11px] text-[#ff8a1f] font-bold uppercase tracking-widest">${place.category || text('nearbyDistance')}</span>
      <h3 class="mt-2 mb-1 text-xl font-['Playfair_Display',_serif] font-bold text-gray-900 group-hover:text-[#ff8a1f] transition-colors">${place.name}</h3>
      <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed">${place.description || text('nearbyDistance')}</p>
    </div>`;
  card.addEventListener('click', () => selectDestination(place.name, place.image, card));
  return card;
}

function findNearbyPlaces() {
  if (!window.isSecureContext && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    nearbyStatus.textContent = text('locationSecureContext');
    nearbyStatus.classList.remove('hidden');
    return;
  }

  if (!navigator.geolocation) {
    nearbyStatus.textContent = text('nearbyError');
    nearbyStatus.classList.remove('hidden');
    return;
  }

  nearbySearchButton.disabled = true;
  nearbyStatus.textContent = text('locating');
  nearbyStatus.classList.remove('hidden');
  nearbyCards.replaceChildren();

  navigator.geolocation.getCurrentPosition(async position => {
    nearbyStatus.textContent = text('nearbyLoading');
    try {
      const response = await fetch(NEARBY_PLACES_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          language: getSelectedLanguage()
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || text('nearbyError'));
      if (!data.places || data.places.length === 0) {
        nearbyStatus.textContent = text('nearbyEmpty');
        return;
      }
      nearbyStatus.classList.add('hidden');
      data.places.forEach(place => nearbyCards.appendChild(createNearbyCard(place)));
    } catch (error) {
      nearbyStatus.textContent = error.message || text('nearbyError');
    } finally {
      nearbySearchButton.disabled = false;
    }
  }, error => {
    const errorMessage = error.code === error.PERMISSION_DENIED
      ? text('locationPermission')
      : error.code === error.TIMEOUT
        ? text('locationTimeout')
        : text('nearbyError');
    nearbyStatus.textContent = errorMessage;
    nearbySearchButton.disabled = false;
  }, { enableHighAccuracy: true, timeout: 10000 });
}

// --- Event Listeners ---

// Close Button
closeButton.addEventListener('click', deselectDestination);

// Sidebar navigation
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => showView(link.dataset.viewTarget));
});

nearbySearchButton.addEventListener('click', findNearbyPlaces);

// Navbar toggle
navToggle.addEventListener('click', () => {
  const isCollapsed = document.body.classList.toggle('nav-collapsed');
  navToggle.setAttribute('aria-expanded', String(!isCollapsed));
  navToggle.setAttribute('aria-label', isCollapsed ? 'Expand navigation' : 'Collapse navigation');
});

// Keep the global language preference synchronized with the guide settings.
appLanguageSelect.addEventListener('change', () => {
  setSelectedLanguage(appLanguageSelect.value);
});

languageSelect.addEventListener('change', () => {
  setSelectedLanguage(languageSelect.value);
});

// Search
searchButton.addEventListener('click', searchDestinations);
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    searchDestinations();
  }
});

// Card Clicks
document.querySelectorAll('.place-card:not(.search-preview-card)').forEach(card => {
  card.addEventListener('click', () => {
    selectDestination(card.dataset.place, card.dataset.image, card);
  });
});

// Option Toggles (History Type)
const lengthButtons = document.querySelectorAll('[data-group="length"] button');
lengthButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    lengthButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.length = btn.dataset.value;
  });
});

// Option Toggles (Voice Gender)
const voiceButtons = document.querySelectorAll('[data-group="voice"] button');
voiceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    voiceButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.voice = btn.dataset.value;
  });
});


// Generate Audio guide button Logic

const API_BASE_URL = (window.TRAVEL_GUIDE_API_URL || '').replace(/\/$/, '');
const GENERATE_AUDIO_GUIDE_API_URL = `${API_BASE_URL}/generate-audio-guide`;
const ASK_GUIDE_API_URL = `${API_BASE_URL}/ask-guide`;
const IDENTIFY_PLACE_API_URL = `${API_BASE_URL}/identify-place`;
const NEARBY_PLACES_API_URL = `${API_BASE_URL}/nearby-places`;

generateButton.addEventListener('click', async () => {
  generateButton.disabled = true;
  generateButton.textContent = text('generating');

  try {
    const selectedLanguage = getSelectedLanguage();
    const selectedVoice = state.voice;

    const response = await fetch(GENERATE_AUDIO_GUIDE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        place: state.place,
        answerType: state.length,
        language: selectedLanguage,
        voiceId: VOICES[selectedLanguage][selectedVoice],
        locale: LOCALES[selectedLanguage]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Generation failed (${response.status})`);
    }

    const data = await response.json();

    // Update UI with Result
    transcriptText.textContent = data.description;
    state.description = data.description;
    audioSection.classList.remove('hidden');
    askGuideForm.classList.remove('hidden');
    askGuideContext.textContent = TRANSLATIONS[getSelectedLanguage()].askPlaceContext
      .replace('{place}', state.place);

    if (data.audio) {
      audioPlayer.src = `data:audio/mp3;base64,${data.audio}`;
      audioPlayer.load();
      audioPlayer.classList.remove('hidden');
      generateButton.textContent = text('listenAudio');
    } else {
      audioPlayer.classList.add('hidden');
      throw new Error('The guide was generated, but audio was not returned.');
    }

  } catch (err) {
    console.error(err);
    alert(err.message || 'Generation failed. Please check your connection.');
    generateButton.textContent = text('generateAudioGuide');
    generateButton.disabled = false;
  }
});

askGuideForm.addEventListener('submit', async event => {
  event.preventDefault();
  const question = guideQuestionInput.value.trim();
  const place = guidePlaceInput.value.trim() || state.place;
  if (!question) return;
  if (!place) {
    guidePlaceInput.focus();
    return;
  }

  askGuideButton.disabled = true;
  askGuideButton.textContent = text('thinking');
  guideAnswer.classList.add('hidden');

  try {
    const response = await fetch(ASK_GUIDE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        place,
        question,
        context: state.description,
        language: getSelectedLanguage()
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || `Question failed (${response.status})`);
    }
    guideAnswer.textContent = data.answer;
    guideAnswer.classList.remove('hidden');
  } catch (error) {
    const message = error instanceof TypeError
      ? 'The guide service is unavailable. Please start the Flask backend and try again.'
      : error.message || 'The guide could not answer that question.';
    alert(message);
  } finally {
    askGuideButton.disabled = false;
    askGuideButton.textContent = text('askGuide');
  }
});

photoForm.addEventListener('submit', async event => {
  event.preventDefault();
  const photo = photoInput.files[0];
  if (!photo) {
    alert(text('noPhoto'));
    return;
  }

  identifyButton.disabled = true;
  identifyButton.textContent = text('identifying');
  identificationResult.classList.add('hidden');

  try {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('language', getSelectedLanguage());
    const response = await fetch(IDENTIFY_PLACE_API_URL, {
      method: 'POST',
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || `Identification failed (${response.status})`);
    }
    identificationResult.textContent = data.description;
    identificationResult.classList.remove('hidden');
  } catch (error) {
    alert(error.message || 'The photo could not be identified.');
  } finally {
    identifyButton.disabled = false;
    identifyButton.textContent = text('identifyExplain');
  }
});

// Transcript Toggle
transcriptToggle.addEventListener('click', () => {
  transcriptContent.classList.toggle('hidden');
  transcriptArrow.classList.toggle('rotate-180');
});
