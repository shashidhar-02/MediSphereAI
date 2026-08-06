#!/bin/bash
set -e

echo "🧪 Executing MediSphere AI Automated Test Suite..."
cd backend
python -m pytest tests/ -v --tb=short
echo "✅ All tests passed successfully!"
