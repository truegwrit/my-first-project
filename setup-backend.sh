#!/bin/bash

# AI Art Discovery - Backend Setup Script
echo "🎨 AI Art Discovery - Backend Setup"
echo "===================================="
echo ""

# Check Node.js
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "   Install from: https://nodejs.org"
    exit 1
fi
echo "✅ Node.js $(node --version) found"
echo ""

# Check PostgreSQL
echo "📦 Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed!"
    echo "   Mac: brew install postgresql@14"
    echo "   Linux: sudo apt install postgresql"
    exit 1
fi
echo "✅ PostgreSQL found"
echo ""

# Check if PostgreSQL is running
echo "🔍 Checking if PostgreSQL is running..."
if ! pg_isready -q; then
    echo "⚠️  PostgreSQL is not running. Trying to start it..."

    # Try to start based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start postgresql@14
    else
        sudo service postgresql start
    fi

    sleep 2

    if ! pg_isready -q; then
        echo "❌ Could not start PostgreSQL. Please start it manually."
        exit 1
    fi
fi
echo "✅ PostgreSQL is running"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Check for .env file
echo "🔐 Checking environment configuration..."
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit backend/.env and add your API keys!"
    echo "   See GET_API_KEYS.md for instructions"
    echo ""
    echo "   Required keys:"
    echo "   - ANTHROPIC_API_KEY"
    echo "   - OPENAI_API_KEY"
    echo "   - GOOGLE_API_KEY"
    echo "   - JWT_SECRET (any random string)"
    echo ""
    read -p "Press Enter after you've edited .env with your API keys..."
else
    echo "✅ .env file exists"
fi
echo ""

# Create database
echo "🗄️  Setting up database..."
DB_EXISTS=$(psql -lqt | cut -d \| -f 1 | grep -w ai_art_discovery)
if [ -z "$DB_EXISTS" ]; then
    echo "Creating database 'ai_art_discovery'..."
    createdb ai_art_discovery
    if [ $? -ne 0 ]; then
        echo "❌ Failed to create database"
        echo "   Try: createdb -U postgres ai_art_discovery"
        exit 1
    fi
    echo "✅ Database created"
else
    echo "✅ Database already exists"
fi
echo ""

# Run migrations
echo "📊 Running database migrations..."
npm run migrate
if [ $? -ne 0 ]; then
    echo "❌ Migration failed"
    exit 1
fi
echo "✅ Database tables created"
echo ""

# Success!
echo "========================================="
echo "✅ Backend setup complete!"
echo "========================================="
echo ""
echo "To start the backend server:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "The server will run on http://localhost:3000"
echo ""
