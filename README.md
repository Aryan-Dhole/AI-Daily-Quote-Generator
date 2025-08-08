# 🧠 Daily AI Quote Generator

A smart, minimalistic quote generator powered by **GPT-3.5 via OpenRouter** — with a **24-hour lock system** to encourage one meaningful quote per day.

---
### 🔐 Setup

1. Replace `YOUR_OPENROUTER_API_KEY_HERE` in `script.js` with your real key
2. Keep your key private — do NOT upload it to GitHub or Netlif
---

## ⚙️ Features

- 🔍 AI-generated quotes using GPT-3.5
- 🔐 24-hour quote lock (prevents spam + enforces habit)
- ⏱️ Typewriter effect for clean, animated output
- 🔁 Manual reset button for devs/testing
- 💾 LocalStorage persistence for state memory

---

## 🛠️ Tech Stack

- HTML + CSS + JS (Vanilla)
- OpenRouter (GPT 3.5-turbo API)
- Bootstrap (for quick UI polish)
- LocalStorage (24-hour memory)

---

## 🧪 Live Demo

🌐 [https://your-netlify-url.netlify.app](https://ai-daily-quote-generator.netlify.app/)

---

## 🔐 Setup

1. Clone the repo
2. Replace the placeholder in `script.js`:

```js
"Authorization": "Bearer YOUR_OPENROUTER_API_KEY_HERE"
