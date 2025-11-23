#!/bin/bash

# AI Art Discovery - Start Application
echo "🎨 Starting AI Art Discovery App"
echo "===================================="
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down..."
    kill $BACKEND_PID 2>/dev/null
    kill $MOBILE_PID 2>/dev/null
    exit 0
}

trap cleanup INT TERM

# Check if backend is set up
if [ ! -f backend/.env ]; then
    echo "❌ Backend not configured!"
    echo "   Run: ./setup-backend.sh first"
    exit 1
fi

# Check if mobile is set up
if [ ! -d mobile/node_modules ]; then
    echo "❌ Mobile app not configured!"
    echo "   Run: ./setup-mobile.sh first"
    exit 1
fi

# Start backend
echo "🚀 Starting backend server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 3

# Check if backend started
if ! curl -s http://localhost:3000/health > /dev/null; then
    echo "❌ Backend failed to start"
    echo "   Check backend/.env for correct configuration"
    kill $BACKEND_PID
    exit 1
fi
echo "✅ Backend running on http://localhost:3000"
echo ""

# Start mobile
echo "📱 Starting mobile app..."
cd mobile
npm start &
MOBILE_PID=$!
cd ..

echo ""
echo "========================================="
echo "✅ Application is running!"
echo "========================================="
echo ""
echo "Backend: http://localhost:3000"
echo "Mobile: Check the Expo window that opened"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user to stop
wait
