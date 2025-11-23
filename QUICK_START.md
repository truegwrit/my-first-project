# 🚀 Quick Start Guide

**Never done this before? No problem!** Follow these simple steps.

## The Super Simple Way (Recommended)

### Step 1: Get API Keys (5 minutes)

Open `GET_API_KEYS.md` and follow the instructions to get your free API keys from:
- Anthropic (Claude)
- OpenAI (ChatGPT)
- Google (Gemini)

**Keep these keys handy!**

### Step 2: Set Up Backend (5 minutes)

Open your terminal in this project folder and run:

```bash
./setup-backend.sh
```

This script will:
- ✅ Check if you have Node.js and PostgreSQL
- ✅ Install all backend packages
- ✅ Create the database
- ✅ Ask you to add your API keys
- ✅ Set up all database tables

Just follow the prompts!

### Step 3: Set Up Mobile App (3 minutes)

In the same terminal:

```bash
./setup-mobile.sh
```

This script will:
- ✅ Install all mobile app packages
- ✅ Install Expo CLI
- ✅ Configure the API connection
- ✅ Ask how you'll run the app (simulator/phone)

### Step 4: Start Everything (1 command!)

```bash
./start-app.sh
```

This starts both the backend server and mobile app at once!

---

## Manual Setup (If Scripts Don't Work)

See `INSTALLATION_STEPS.md` for detailed step-by-step instructions.

---

## What You'll Need

**Software** (all free):
- Node.js 16+
- PostgreSQL 14+
- Expo Go app (on your phone) OR iOS Simulator / Android Emulator

**API Keys** (all have free tiers):
- Anthropic Claude API key
- OpenAI API key
- Google Gemini API key

---

## First Time Using the App

1. **Open the app** on your phone/simulator
2. **Tap "Register"** to create an account
3. **Go to Chat tab** and tap the + button
4. **Choose an AI** (Claude, GPT, or Gemini)
5. **Start chatting!** Try: "I'm looking for relaxing music"
6. **Watch recommendations appear** as you chat!

---

## Troubleshooting

### "Command not found: ./setup-backend.sh"

Make scripts executable first:
```bash
chmod +x *.sh
```

### "PostgreSQL not installed"

**Mac:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux:**
```bash
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

**Windows:**
Download from https://www.postgresql.org/download/windows/

### "Can't connect to backend"

1. Make sure backend is running (you should see "Server running on port 3000")
2. Check `mobile/src/config/api.js` has the right IP address
3. Make sure phone and computer are on the same WiFi

### "Invalid API key"

Double-check:
- You copied the full key (no spaces)
- You saved the `backend/.env` file
- The key has the right prefix (sk-ant-, sk-, etc.)

---

## Help & Support

- Read `INSTALLATION_STEPS.md` for detailed instructions
- Read `SETUP_GUIDE.md` for troubleshooting
- Check the README.md for API documentation

---

## File Guide

Here's what each file does:

| File | What it does |
|------|--------------|
| `GET_API_KEYS.md` | How to get your free API keys |
| `QUICK_START.md` | This file - fastest way to get started |
| `INSTALLATION_STEPS.md` | Detailed manual setup instructions |
| `setup-backend.sh` | Automated backend setup script |
| `setup-mobile.sh` | Automated mobile setup script |
| `start-app.sh` | Start both backend and mobile |
| `SETUP_GUIDE.md` | Complete reference with troubleshooting |
| `README.md` | Project documentation |

---

## Next Steps After Setup

Once the app is running:

1. **Explore the features:**
   - Chat with different AI models
   - Save recommendations you like
   - Share discoveries with the community
   - Follow other users

2. **Customize it:**
   - Edit AI prompts in `backend/src/services/aiService.js`
   - Add new art sources in `backend/src/services/scrapingService.js`
   - Change the UI colors in the mobile app

3. **Learn more:**
   - Read the README for API documentation
   - Check the code to see how it works
   - Try modifying features!

Have fun! 🎨📱
