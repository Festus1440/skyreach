#!/usr/bin/env bash
# Start backend and frontend dev servers from project root.
# Usage: ./start.sh   (or: bash start.sh)

set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND_PID=""

cleanup() {
  echo ""
  echo "Shutting down..."
  if [ -n "$BACKEND_PID" ]; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
  exit 0
}

trap cleanup SIGINT SIGTERM

echo "Starting backend (port 3001)..."
cd "$ROOT/backend"
npm run dev &
BACKEND_PID=$!

echo "Starting frontend (port 5173)..."
cd "$ROOT/frontend"
npm run dev

# If frontend exits, cleanup
cleanup
