# 👋 START HERE - Your Path to Success

**New to coding? Never set up an app before? Perfect!** This guide is for you.

---

## 🎯 Your Mission (if you choose to accept it)

Get this AI Art Discovery app running on your phone in about 30 minutes.

---

## 📋 What You Need

### On Your Computer:
- [ ] **Node.js** - Download from https://nodejs.org (get the LTS version)
- [ ] **PostgreSQL** - Database software
  - Mac: `brew install postgresql@14`
  - Windows: https://www.postgresql.org/download/windows/
  - Linux: `sudo apt install postgresql`

### On Your Phone:
- [ ] **Expo Go app** - Download from App Store or Google Play
  - OR use an iOS Simulator / Android Emulator on your computer

### Free API Keys (we'll get these together):
- [ ] Anthropic Claude
- [ ] OpenAI ChatGPT
- [ ] Google Gemini

---

## 🚀 The Three-Step Process

### STEP 1: Get Your API Keys (10 minutes)

**Open this file:** `GET_API_KEYS.md`

It has links and screenshots for getting free API keys from:
1. Anthropic (Claude AI)
2. OpenAI (ChatGPT)
3. Google (Gemini)

**Keep these keys safe!** You'll paste them in a file in Step 2.

**Pro tip:** Each service gives you free credits to start:
- Claude: $5 free
- OpenAI: $5 free for 3 months
- Gemini: Free tier

---

### STEP 2: Set Up the Backend (10 minutes)

**What's a backend?** It's the server that talks to the AI APIs and stores your data.

#### Option A: Automatic (Easiest!)

Open Terminal (Mac/Linux) or Command Prompt (Windows) in this folder and run:

```bash
./setup-backend.sh
```

The script will:
- Check if you have everything installed
- Install all the code packages
- Create the database
- Ask you to paste your API keys
- Set everything up automatically

**Just follow the prompts!**

#### Option B: Manual

If the script doesn't work, open `INSTALLATION_STEPS.md` and follow the "Backend Setup" section step-by-step.

---

### STEP 3: Set Up the Mobile App (10 minutes)

**What's this do?** Sets up the app that runs on your phone.

#### Option A: Automatic (Easiest!)

In your terminal, run:

```bash
./setup-mobile.sh
```

The script will:
- Install the mobile app packages
- Ask how you'll run it (phone, simulator, or emulator)
- Configure everything automatically

#### Option B: Manual

Open `INSTALLATION_STEPS.md` and follow the "Mobile App Setup" section.

---

## ✅ You're Done! Now Test It

### Start Everything:

#### Super Easy Way:
```bash
./start-app.sh
```
This starts both backend and mobile at once!

#### Manual Way:

**Terminal 1** (Backend):
```bash
cd backend
npm start
```
Wait until you see: "Server running on port 3000"

**Terminal 2** (Mobile):
```bash
cd mobile
npm start
```

### Use the App:

1. **On Phone:** Open Expo Go app, scan the QR code
2. **On Simulator:** Press 'i' (iOS) or 'a' (Android)
3. **Create Account:** Tap "Register"
4. **Start Chatting:** Go to Chat tab, tap +, choose an AI
5. **Get Recommendations:** Chat about art you like!

---

## 🆘 Help! Something Broke

### Quick Fixes:

**"Command not found"**
```bash
chmod +x *.sh
```

**"Can't connect to database"**
- Mac: `brew services start postgresql@14`
- Linux: `sudo service postgresql start`
- Windows: Check PostgreSQL is running in Services

**"Invalid API key"**
- Open `backend/.env`
- Check keys are pasted correctly (no spaces)
- Make sure you saved the file

**"Can't connect to backend from phone"**
- Make sure backend is running (terminal shows "Server running")
- Check `mobile/src/config/api.js` has your computer's IP
- Phone and computer must be on same WiFi

### Still Stuck?

1. **Read:** `INSTALLATION_STEPS.md` (detailed instructions)
2. **Check:** `SETUP_GUIDE.md` (troubleshooting section)
3. **Use:** `CHECKLIST.md` (find which step failed)

---

## 📚 All Your Resources

| File | When to Use It |
|------|----------------|
| **START_HERE.md** | You are here! Start with this |
| **GET_API_KEYS.md** | Getting your API keys |
| **QUICK_START.md** | Quick overview of the process |
| **INSTALLATION_STEPS.md** | Detailed step-by-step manual setup |
| **CHECKLIST.md** | Track your progress |
| **SETUP_GUIDE.md** | Complete reference & troubleshooting |
| **README.md** | Technical documentation |

| Script | What It Does |
|--------|--------------|
| `setup-backend.sh` | Automatically set up backend |
| `setup-mobile.sh` | Automatically set up mobile app |
| `start-app.sh` | Start everything with one command |

---

## 🎓 What You'll Learn

By getting this app running, you'll:
- Install and use Node.js
- Set up a PostgreSQL database
- Use environment variables
- Run a backend server
- Use React Native and Expo
- Connect to AI APIs
- Debug common errors

**Even if you get stuck, you're learning!**

---

## 🎉 After It Works

Celebrate! Then:

1. **Play with it**: Chat with different AIs, explore features
2. **Share it**: Show friends what you built
3. **Customize it**: Change colors, add features
4. **Learn more**: Read the code, see how it works

---

## 💡 Pro Tips

- **Take breaks**: If stuck for 10 minutes, take a 5-minute break
- **Read error messages**: They usually tell you what's wrong
- **Google is your friend**: Copy error messages into Google
- **One step at a time**: Don't skip ahead
- **Save your work**: If something works, don't change it!

---

## Ready? Let's Go! 🚀

**Your Path:**

1. ✅ Read this file (you're doing it!)
2. → Open `GET_API_KEYS.md` and get your keys
3. → Run `./setup-backend.sh`
4. → Run `./setup-mobile.sh`
5. → Run `./start-app.sh`
6. → Use the app!

**Time estimate:** 30-45 minutes for first-time setup

**You got this!** 💪

---

## Need More Details?

- **Quick overview**: Read `QUICK_START.md`
- **Step-by-step manual**: Read `INSTALLATION_STEPS.md`
- **Track progress**: Use `CHECKLIST.md`
- **Troubleshooting**: See `SETUP_GUIDE.md`

**Start with the easiest path first (the scripts), then try manual if needed.**

Good luck! 🍀
