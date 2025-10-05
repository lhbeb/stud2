#!/bin/bash

# Start the Express server
echo "🚀 Starting Express server..."
node server/index.js &

# Wait a moment for server to start
sleep 2

# Start the Vite dev server
echo "🎨 Starting Vite dev server..."
npm run dev
