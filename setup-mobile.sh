#!/bin/bash

# AI Art Discovery - Mobile Setup Script
echo "📱 AI Art Discovery - Mobile Setup"
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

# Install Expo CLI if needed
echo "📦 Checking Expo CLI..."
if ! command -v expo &> /dev/null; then
    echo "Installing Expo CLI globally..."
    npm install -g expo-cli
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Expo CLI"
        exit 1
    fi
fi
echo "✅ Expo CLI ready"
echo ""

# Install mobile dependencies
echo "📦 Installing mobile app dependencies..."
cd mobile
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Configure API URL
echo "🔧 Configuring API connection..."
echo ""
echo "Where will you run the mobile app?"
echo "1) iOS Simulator (Mac only)"
echo "2) Android Emulator"
echo "3) Physical device (phone/tablet)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        API_URL="http://localhost:3000/api"
        echo "Using: $API_URL"
        ;;
    2)
        API_URL="http://10.0.2.2:3000/api"
        echo "Using: $API_URL (Android emulator special address)"
        ;;
    3)
        echo ""
        echo "Find your computer's IP address:"
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "Run: ifconfig | grep 'inet '"
            IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')
            if [ ! -z "$IP" ]; then
                echo "Detected IP: $IP"
                read -p "Use this IP? (y/n): " use_ip
                if [ "$use_ip" = "y" ]; then
                    API_URL="http://$IP:3000/api"
                else
                    read -p "Enter your IP address: " custom_ip
                    API_URL="http://$custom_ip:3000/api"
                fi
            fi
        else
            echo "Run: ifconfig or ip addr"
            read -p "Enter your IP address: " custom_ip
            API_URL="http://$custom_ip:3000/api"
        fi
        ;;
    *)
        echo "Invalid choice. Using localhost."
        API_URL="http://localhost:3000/api"
        ;;
esac

# Update API config file
echo "export const API_BASE_URL = '$API_URL';" > src/config/api-url-temp.txt
if grep -q "export const API_BASE_URL" src/config/api.js; then
    # Backup original
    cp src/config/api.js src/config/api.js.backup

    # Replace the API_BASE_URL line
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|export const API_BASE_URL = '.*'|export const API_BASE_URL = '$API_URL'|" src/config/api.js
    else
        sed -i "s|export const API_BASE_URL = '.*'|export const API_BASE_URL = '$API_URL'|" src/config/api.js
    fi
    echo "✅ API URL configured: $API_URL"
else
    echo "⚠️  Could not automatically configure API URL"
    echo "   Manually edit mobile/src/config/api.js"
    echo "   Set: export const API_BASE_URL = '$API_URL';"
fi
rm -f src/config/api-url-temp.txt
echo ""

# Instructions
echo "========================================="
echo "✅ Mobile setup complete!"
echo "========================================="
echo ""
echo "Before starting the mobile app:"
echo "1. Make sure backend is running (in another terminal):"
echo "   cd backend && npm start"
echo ""
echo "2. Then start the mobile app:"
echo "   cd mobile && npm start"
echo ""
echo "3. Options to run:"
echo "   - Press 'i' for iOS Simulator"
echo "   - Press 'a' for Android Emulator"
echo "   - Scan QR code with Expo Go app on phone"
echo ""
