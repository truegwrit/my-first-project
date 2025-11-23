# Quick Setup Guide

## Step-by-Step Installation

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd ai-art-discovery

# Install all dependencies
npm run install:all
```

### 2. Database Setup

```bash
# Install PostgreSQL (if not already installed)
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Create database
createdb ai_art_discovery

# Or using psql
psql -U postgres
CREATE DATABASE ai_art_discovery;
\q
```

### 3. Environment Configuration

```bash
# Copy environment template
cd backend
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your preferred editor
```

**Required API Keys:**

1. **Anthropic Claude** - Get key from: https://console.anthropic.com/
2. **OpenAI** - Get key from: https://platform.openai.com/api-keys
3. **Google Gemini** - Get key from: https://makersuite.google.com/app/apikey

### 4. Run Database Migrations

```bash
# From the backend directory
npm run migrate
```

### 5. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:3000`

### 6. Configure Mobile App

```bash
# Navigate to mobile directory
cd ../mobile

# Find your local IP address
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig

# Update API URL in mobile/src/config/api.js
# Replace localhost with your IP address
export const API_BASE_URL = 'http://192.168.1.XXX:3000/api';
```

### 7. Start Mobile App

```bash
# Start Expo development server
npm start

# Or run directly on platform
npm run android  # For Android
npm run ios      # For iOS (Mac only)
```

## Testing the App

### 1. Create an Account
1. Open the app on your device
2. Tap "Don't have an account? Register"
3. Fill in your details
4. Tap "Register"

### 2. Start a Conversation
1. Go to the "Chat" tab
2. Tap the "+" button
3. Select an AI model (Claude, GPT, or Gemini)
4. Start chatting about your art preferences

### 3. Get Recommendations
- **Real-time**: Recommendations appear during chat
- **Summary**: After chatting, tap "Generate Summary"

### 4. Explore Social Features
1. Save recommendations you like
2. Share recommendations to the feed
3. Follow other users
4. Like and review art items

## Common Issues

### Backend won't start

**Error: Database connection failed**
```bash
# Check PostgreSQL is running
# macOS
brew services list

# Linux
sudo service postgresql status

# Verify database exists
psql -U postgres -l
```

**Error: Port 3000 already in use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change PORT in .env
PORT=3001
```

### Mobile app can't connect to backend

**Issue: Network request failed**

1. Verify backend is running
2. Check `API_BASE_URL` in `mobile/src/config/api.js`
3. Use IP address, NOT `localhost`
4. Ensure phone/emulator is on same network
5. Check firewall settings

**For iOS Simulator:**
```javascript
export const API_BASE_URL = 'http://localhost:3000/api';
```

**For Android Emulator:**
```javascript
export const API_BASE_URL = 'http://10.0.2.2:3000/api';
```

**For Physical Device:**
```javascript
export const API_BASE_URL = 'http://YOUR_COMPUTER_IP:3000/api';
```

### AI API Errors

**Error: Invalid API key**
- Verify API keys in `.env`
- Ensure no extra spaces or quotes
- Check API key has proper permissions

**Error: Rate limit exceeded**
- Wait before making more requests
- Check API usage on provider dashboard
- Consider upgrading API plan

## Environment Variables Reference

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_art_discovery
DB_USER=postgres
DB_PASSWORD=your_password

# Security
JWT_SECRET=generate_random_string_here

# AI APIs
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=...

# Web Scraping
SCRAPING_RATE_LIMIT=1000
USER_AGENT=Mozilla/5.0 (compatible; ArtDiscoveryBot/1.0)
```

## Generating Secure JWT Secret

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32

# Python
python -c "import secrets; print(secrets.token_hex(32))"
```

## Development Tips

### Reset Database

```bash
# Drop and recreate database
dropdb ai_art_discovery
createdb ai_art_discovery
npm run migrate
```

### View Database

```bash
# Connect to database
psql -U postgres -d ai_art_discovery

# List tables
\dt

# Query users
SELECT * FROM users;

# Exit
\q
```

### Debug Backend

```bash
# View server logs
npm run dev

# Test API endpoint
curl http://localhost:3000/health
```

### Debug Mobile

```bash
# Clear cache
expo start -c

# Reset Metro bundler
expo start --reset-cache
```

## Production Deployment

### Backend

1. Set `NODE_ENV=production`
2. Use production database
3. Enable HTTPS
4. Set up process manager (PM2)
5. Configure reverse proxy (nginx)
6. Enable rate limiting
7. Set up monitoring

### Mobile

1. Update `API_BASE_URL` to production server
2. Build for production:
   ```bash
   expo build:android
   expo build:ios
   ```
3. Submit to app stores

## Getting Help

- Check the main README.md for detailed documentation
- Review API documentation for endpoint details
- Check console logs for error messages
- Ensure all dependencies are installed
- Verify all environment variables are set

## Next Steps

After setup:
1. Explore the app features
2. Customize AI prompts in `backend/src/services/aiService.js`
3. Add new web scraping sources in `backend/src/services/scrapingService.js`
4. Customize the mobile UI
5. Add your own features!
