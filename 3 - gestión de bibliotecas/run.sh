#!/bin/bash

echo "Checking dependencies..."

# Check and install backend dependencies
cd backend
if [ ! -d "node_modules" ]; then
echo "Installing backend dependencies..."
npm install
fi
cd ..

# Check and install frontend dependencies
cd frontend
if [ ! -d "node_modules" ]; then
echo "Installing frontend dependencies..."
npm install
fi
cd ..

echo "Starting backend server..."
cd backend && npm run dev &

# Wait a few seconds for backend to start
sleep 3

# Navigate to frontend directory and start frontend server
echo "Starting frontend server..."
cd ../frontend && npm start

# Wait for any key press to stop the servers
echo "Press any key to stop the servers..."
read -n 1

# Kill all running processes
pkill -f "node"
