# ✅ Setup Checklist

Use this checklist to track your progress!

## Before You Start

- [ ] I have Node.js installed (run `node --version`)
- [ ] I have PostgreSQL installed (run `psql --version`)
- [ ] I have a text editor (VS Code, Sublime, Notepad++, etc.)
- [ ] I have a phone with Expo Go app OR an iOS/Android emulator

## Getting API Keys

- [ ] I created an Anthropic account at https://console.anthropic.com/
- [ ] I got my Claude API key (starts with sk-ant-)
- [ ] I created an OpenAI account at https://platform.openai.com/
- [ ] I got my OpenAI API key (starts with sk-)
- [ ] I created a Google account at https://makersuite.google.com/
- [ ] I got my Gemini API key
- [ ] I saved all three keys somewhere safe

## Backend Setup

- [ ] I ran `./setup-backend.sh` (or followed manual steps)
- [ ] PostgreSQL is running
- [ ] Database "ai_art_discovery" was created
- [ ] I copied `backend/.env.example` to `backend/.env`
- [ ] I pasted my API keys into `backend/.env`
- [ ] I added a JWT_SECRET to `backend/.env`
- [ ] I ran `npm run migrate` (database tables created)
- [ ] Backend packages installed (node_modules folder exists)

## Mobile Setup

- [ ] I ran `./setup-mobile.sh` (or followed manual steps)
- [ ] Expo CLI is installed globally
- [ ] I updated `mobile/src/config/api.js` with correct IP
- [ ] Mobile packages installed (node_modules folder exists)

## Testing

- [ ] I started the backend server (`cd backend && npm start`)
- [ ] Backend shows "Server running on port 3000"
- [ ] I can visit http://localhost:3000/health in my browser
- [ ] I started the mobile app (`cd mobile && npm start`)
- [ ] Expo dev tools opened in my browser
- [ ] I can see the app on my phone/simulator

## First App Test

- [ ] App loads without errors
- [ ] I can tap "Register" and create an account
- [ ] I can log in with my new account
- [ ] I can see the Home screen
- [ ] I can go to the Chat tab
- [ ] I can create a new conversation
- [ ] I can select an AI model (Claude/GPT/Gemini)
- [ ] I can send a message
- [ ] The AI responds to my message
- [ ] I can see recommendations appear

## Optional Features Test

- [ ] I tried generating summary recommendations
- [ ] I saved a recommendation
- [ ] I can see my saved items
- [ ] I can view my profile
- [ ] I can edit my settings
- [ ] I can see the social feed

## Troubleshooting (if needed)

If something didn't work:

- [ ] I checked the backend terminal for error messages
- [ ] I checked the Expo terminal for error messages
- [ ] I verified my API keys are correct in .env
- [ ] I made sure PostgreSQL is running
- [ ] I checked my IP address is correct (for physical device)
- [ ] I read INSTALLATION_STEPS.md for help
- [ ] I checked SETUP_GUIDE.md troubleshooting section

## Success! 🎉

- [ ] Everything works!
- [ ] I understand how to start/stop the app
- [ ] I know where to find documentation
- [ ] I'm ready to customize the app

---

## Quick Reference

**Start backend:**
```bash
cd backend && npm start
```

**Start mobile:**
```bash
cd mobile && npm start
```

**Start both (with script):**
```bash
./start-app.sh
```

**Reset database:**
```bash
dropdb ai_art_discovery
createdb ai_art_discovery
cd backend && npm run migrate
```

**Check backend is running:**
```bash
curl http://localhost:3000/health
```

---

## What's Next?

Now that everything works, you can:

1. **Use the app**: Chat with AI, get art recommendations, explore social features
2. **Customize it**: Edit AI prompts, add new features, change the UI
3. **Learn from it**: Read the code to understand how it works
4. **Share it**: Show friends, deploy it, make it better!

Enjoy your AI Art Discovery app! 🎨
