# MediSphere AI Setup Script for Windows PowerShell

Write-Host "🚀 Initializing MediSphere AI Enterprise Stack..." -ForegroundColor Cyan

# 1. Environment Variable Setup
if (-not (Test-Path "backend\.env")) {
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "✅ Created backend\.env from example template." -ForegroundColor Green
}

# 2. Docker Compose Orchestration Launch
Write-Host "🐳 Building and launching Docker Compose containers..." -ForegroundColor Yellow
docker compose up -d --build

# 3. Verification Probe
Write-Host "🔍 Verifying active container deployment..." -ForegroundColor Yellow
docker compose ps

Write-Host "🎉 Setup Complete! Access Dashboard at http://localhost:3000 and API Docs at http://localhost:8000/docs" -ForegroundColor Green
