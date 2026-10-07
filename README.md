# 🌍 AI Tourist Guide

An AI-powered tourist guide that provides information about historical and cultural places using **Google Gemini** and converts the generated information into speech using **Murf AI**.

## ✨ Features

- 🤖 AI-generated tourist information
- 📝 **Summary, Balanced & Detailed** response modes
- 🌐 Multilingual responses
- 🔊 Text-to-Speech using Murf AI
- 💬 Interactive tourist information

## 🏗️ Architecture

```text
User
  ↓
React + Vite Frontend
  ↓
Python + Flask Backend
  ↓
Google Gemini API
  ↓
Generated Tourist Information
  ↓
Murf AI API
  ↓
Voice Output
```

## 🛠️ Tech Stack

**Frontend:** React, Vite, Bootstrap  
**Backend:** Python, Flask
**AI:** Google Gemini API  
**Text-to-Speech:** Murf AI API

## 📁 Project Structure

```text
TTS/
├── Backend/
│   ├── app.py
│   └── .env
├── Frontend/
├── .gitignore
└── README.md
```

## ⚙️ Setup

### Backend

```bash
cd Backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Add your API keys to `Backend/.env`:

```env
GEMINI_API_KEY=your_key
MURF_API_KEY=your_key
```

> 🔐 Never commit your `.env` file to GitHub.

## 🚀 Future Enhancements

- 📸 Image-based place identification
- 🗺️ Nearby attractions
- 📅 AI travel itinerary
- 🗣️ Ask the Guide
- 🎧 Advanced audio tours
