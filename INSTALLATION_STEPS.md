# Step-by-Step Installation Guide

Follow these steps **in order**. I'll explain what each one does.

## Prerequisites Check

First, let's make sure you have everything installed:

### Check Node.js
```bash
node --version
```
Should show v16 or higher. If not installed:
- **Mac**: `brew install node`
- **Windows**: Download from https://nodejs.org
- **Linux**: `sudo apt install nodejs npm`

### Check PostgreSQL
```bash
psql --version
```
If not installed:
- **Mac**: `brew install postgresql@14`
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **Linux**: `sudo apt install postgresql postgresql-contrib`

### Install Expo CLI
```bash
npm install -g expo-cli
```
This lets you run the mobile app.

---

## Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
# This installs all the backend packages
cd backend
npm install
```

**What this does**: Downloads all the libraries the backend needs (Express, PostgreSQL driver, AI SDKs, etc.)

Wait for it to finish (might take 2-3 minutes), then:

```bash
# Go back to project root
cd ..

# Install mobile app packages
cd mobile
npm install
```

**What this does**: Downloads React Native, navigation libraries, and UI components.

---

## Step 2: Set Up PostgreSQL Database

### Start PostgreSQL

**Mac**:
```bash
brew services start postgresql@14
```

**Linux**:
```bash
sudo service postgresql start
```

**Windows**: PostgreSQL should auto-start, or use the Services app.

### Create the Database

```bash
# This creates a new database called "ai_art_discovery"
createdb ai_art_discovery
```

If you get a permission error, try:
```bash
createdb -U postgres ai_art_discovery
```

### Verify It Worked

```bash
psql -l | grep ai_art_discovery
```

You should see your database listed!

---

## Step 3: Configure Environment Variables

This is where you add your API keys.

```bash
# Go to backend folder
cd backend

# Copy the example file
cp .env.example .env

# Now edit the .env file
# Mac/Linux: nano .env
# Windows: notepad .env
# Or use any text editor
```

Your `.env` file should look like this:

```env
# Server
PORT=3000
NODE_ENV=development

# Database (use these defaults)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_art_discovery
DB_USER=postgres
DB_PASSWORD=

# Security - generate a random string
JWT_SECRET=your_random_secret_here_make_it_long_and_random

# AI API Keys - PASTE YOUR KEYS HERE
ANTHROPIC_API_KEY=sk-ant-your-key-here
OPENAI_API_KEY=sk-your-key-here
GOOGLE_API_KEY=your-google-key-here

# Web Scraping
SCRAPING_RATE_LIMIT=1000
USER_AGENT=Mozilla/5.0 (compatible; ArtDiscoveryBot/1.0)
```

**Important**:
- Replace `your_random_secret_here_make_it_long_and_random` with something random
- Paste your actual API keys (from GET_API_KEYS.md)
- Leave `DB_PASSWORD=` empty if you didn't set a PostgreSQL password

Save the file!

---

## Step 4: Set Up Database Tables

```bash
# Make sure you're in the backend folder
cd backend

# Run migrations (creates all the tables)
npm run migrate
```

**What this does**: Creates all the database tables (users, conversations, messages, recommendations, etc.)

You should see: "Database migration completed successfully!"

---

## Step 5: Start the Backend Server

```bash
# Still in backend folder
npm start
```

**What this does**: Starts your API server on http://localhost:3000

You should see:
```
Server running on port 3000
Environment: development
```

**Leave this terminal window open!** The server needs to keep running.

---

## Step 6: Configure Mobile App

Open a **NEW terminal window** (keep the backend running in the other one).

```bash
# Go to mobile folder
cd mobile

# Edit the API configuration
# Mac/Linux: nano src/config/api.js
# Windows: notepad src/config/api.js
```

Find this line:
```javascript
export const API_BASE_URL = 'http://localhost:3000/api';
```

**For iOS Simulator**: Leave it as `localhost`

**For Android Emulator**: Change to:
```javascript
export const API_BASE_URL = 'http://10.0.2.2:3000/api';
```

**For Physical Device**: Find your computer's IP address:

Mac/Linux:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Windows:
```bash
ipconfig
```

Then use:
```javascript
export const API_BASE_URL = 'http://YOUR_IP_HERE:3000/api';
```

Save the file!

---

## Step 7: Start the Mobile App

```bash
# In the mobile folder
npm start
```

**What this does**: Starts Expo development server

You'll see a QR code and options:
- Press `i` for iOS Simulator (Mac only)
- Press `a` for Android Emulator
- Or scan QR code with Expo Go app on your phone

---

## Step 8: Test the App!

1. **Create an account**:
   - Open the app
   - Tap "Register"
   - Fill in: email, username, password
   - Tap "Register"

2. **Start a conversation**:
   - Go to "Chat" tab
   - Tap the "+" button
   - Choose an AI model (Claude, GPT, or Gemini)
   - Type: "I love impressionist paintings"
   - Watch the AI respond!

3. **Get recommendations**:
   - Keep chatting about art you like
   - Real-time recommendations appear during chat
   - After chatting, you can generate a summary

---

## Common Problems and Solutions

### "Database connection failed"
```bash
# Make sure PostgreSQL is running
brew services list  # Mac
sudo service postgresql status  # Linux

# Restart it if needed
brew services restart postgresql@14  # Mac
sudo service postgresql restart  # Linux
```

### "Port 3000 already in use"
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or change the port in backend/.env
PORT=3001
```

### "Can't connect to backend from mobile"
- Make sure backend is running (Step 5)
- Check you used the right IP address (Step 6)
- Make sure phone and computer are on same WiFi network
- Try turning off your firewall temporarily

### "Invalid API key"
- Double-check you copied the keys correctly
- Make sure there are no spaces before/after the keys
- Make sure you saved the .env file

---

## What's Running?

You should have 2 terminal windows open:

**Terminal 1**: Backend server
```
Server running on port 3000
```

**Terminal 2**: Expo dev server
```
› Metro waiting on exp://192.168.1.x:8081
```

**Your phone/simulator**: The app!

---

## Next Steps After It's Working

1. Try chatting with different AI models
2. Save some recommendations
3. Check out the social feed
4. Update your profile in settings

Have fun discovering art! 🎨
