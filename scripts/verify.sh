#!/bin/bash
set -e

echo "🔍 Verifying MediSphere AI Deployment Readiness..."

# Check Docker Compose status
echo "🐳 Checking Docker containers..."
docker compose ps

# Health Check Probe
echo "🌐 Probing FastAPI Health Endpoint..."
curl -f http://localhost:8000/health || (echo "❌ Backend Health Check Failed!" && exit 1)

echo "📊 Probing Telemetry Metrics Endpoint..."
curl -f http://localhost:8000/metrics || (echo "❌ Metrics Telemetry Failed!" && exit 1)

echo "✅ All verification checks passed clean!"
