# AI Art Discovery App

An AI-powered mobile application that connects users to art (artwork, photography, film, TV, music, books, comics/manga, animation) based on their conversations with AI.

## Features

### Core Functionality
- **Multi-AI Chat Interface**: Converse with Claude (Anthropic), ChatGPT (OpenAI), or Gemini (Google)
- **Real-time Recommendations**: Get art suggestions during conversations
- **Summary Recommendations**: Generate comprehensive recommendations after conversations
- **User Profiles**: Manage preferences, saved items, and art categories
- **Social Features**: Follow users, share recommendations, review art, like posts
- **Web Scraping**: Automated art data collection from various sources

### Technology Stack

#### Backend
- **Node.js** with **Express** - RESTful API server
- **PostgreSQL** - Relational database
- **Socket.io** - Real-time messaging
- **AI SDKs**:
  - Anthropic Claude SDK
  - OpenAI SDK
  - Google Generative AI SDK
- **Web Scraping**: Cheerio, Puppeteer

#### Mobile App
- **React Native** with **Expo** - Cross-platform mobile development
- **React Navigation** - Navigation system
- **React Native Paper** - Material Design UI components
- **Socket.io Client** - Real-time updates

## Project Structure

```
ai-art-discovery/
├── backend/                    # Node.js backend
│   ├── src/
│   │   ├── database/          # Database schema and connection
│   │   ├── middleware/        # Authentication middleware
│   │   ├── routes/            # API routes
│   │   ├── services/          # AI and scraping services
│   │   └── server.js          # Express server
│   ├── .env.example           # Environment variables template
│   └── package.json
│
├── mobile/                     # React Native app
│   ├── src/
│   │   ├── config/            # API configuration
│   │   ├── context/           # React context (Auth)
│   │   ├── navigation/        # Navigation setup
│   │   └── screens/           # App screens
│   ├── App.js                 # Root component
│   ├── app.json               # Expo configuration
│   └── package.json
│
└── README.md
```

## Quick Start

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed installation instructions.

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v14 or higher)
- Expo CLI
- API keys for Anthropic Claude, OpenAI, and Google Gemini

### Installation

```bash
# Install dependencies
npm run install:all

# Set up database
createdb ai_art_discovery
cd backend && npm run migrate

# Configure environment
cp backend/.env.example backend/.env
# Edit .env with your API keys

# Start backend
cd backend && npm start

# Start mobile app (in new terminal)
cd mobile && npm start
```

## Features Breakdown

### 1. Chat with Multiple AI Models
Users can choose between Claude, ChatGPT, or Gemini for their conversations. The app maintains conversation history and provides real-time responses.

### 2. Real-time Art Recommendations
As users chat, the AI analyzes their messages and provides instant art recommendations when appropriate, displayed directly in the chat.

### 3. Summary Recommendations
After a conversation, users can generate a comprehensive list of art recommendations based on the entire conversation context.

### 4. User Profiles & Preferences
- Customizable profile with avatar and bio
- Preferred AI model selection
- Art category preferences
- Privacy settings

### 5. Social Features
- Follow other users
- Share recommendations with the community
- Like and comment on shared items
- Review art items
- Public feed of discoveries

### 6. Web Scraping Service
The app includes a modular scraping service that can be extended to fetch art data from various sources.

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Chat
- `POST /api/chat/conversations` - Create conversation
- `GET /api/chat/conversations` - List conversations
- `POST /api/chat/conversations/:id/messages` - Send message

### Recommendations
- `POST /api/recommendations/conversations/:id/summary` - Generate summary
- `GET /api/recommendations/saved` - Get saved recommendations
- `POST /api/recommendations/:id/save` - Save recommendation

### Social
- `POST /api/social/follow/:userId` - Follow user
- `GET /api/social/feed` - Get public feed
- `POST /api/social/share` - Share recommendation
- `POST /api/social/reviews` - Create review

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for complete API documentation.

## Development

### Adding New Art Sources

Edit `backend/src/services/scrapingService.js` to add new scraping sources.

### Customizing AI Prompts

Edit `backend/src/services/aiService.js` to modify recommendation logic.

## Security

- JWT authentication
- bcrypt password hashing
- SQL injection protection
- CORS configuration
- Rate limiting

## License

MIT License
