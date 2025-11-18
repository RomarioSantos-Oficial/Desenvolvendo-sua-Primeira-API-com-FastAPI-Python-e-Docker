# Script para iniciar a Workout API (Backend + Frontend)
# Uso: .\start.ps1

Write-Host "WORKOUT API - Iniciando aplicacao..." -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# Verifica se esta no diretorio correto  
if (-not (Test-Path "workoutapi\main.py")) {
    Write-Host "ERRO: Arquivo main.py nao encontrado!" -ForegroundColor Red
    Write-Host "Execute este script do diretorio raiz do projeto" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Cria diretorio do banco se nao existir
if (-not (Test-Path "database\storage")) {
    Write-Host "Criando diretorio do banco de dados..." -ForegroundColor Yellow  
    New-Item -ItemType Directory -Path "database\storage" -Force | Out-Null
}

# Verifica se o ambiente virtual existe
if (-not (Test-Path "workoutapi\Scripts\python.exe")) {
    Write-Host "ERRO: Ambiente virtual nao encontrado!" -ForegroundColor Red
    Write-Host "Execute: python -m venv workoutapi" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verifica se as dependencias estao instaladas
Write-Host "Verificando dependencias..." -ForegroundColor Yellow
$uvicornCheck = & "workoutapi\Scripts\python.exe" -c "import uvicorn" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Instalando dependencias necessarias..." -ForegroundColor Yellow
    & "workoutapi\Scripts\pip.exe" install uvicorn fastapi sqlalchemy pydantic pydantic-settings
}

# Inicia o frontend em uma nova janela
if (Test-Path "Frontend\workout-frontend") {
    Write-Host "Iniciando Frontend (React + Vite) em nova janela..." -ForegroundColor Blue
    $frontendPath = Join-Path (Get-Location) "Frontend\workout-frontend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host 'FRONTEND - React Development Server' -ForegroundColor Blue; npm run dev"
    Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
    Start-Sleep -Seconds 2
}

# Inicia o backend
Write-Host "Iniciando Backend (FastAPI)..." -ForegroundColor Green
Write-Host "Backend: http://127.0.0.1:8000" -ForegroundColor Cyan  
Write-Host "Docs: http://127.0.0.1:8000/docs" -ForegroundColor Cyan
Write-Host "Para parar o backend: Ctrl+C" -ForegroundColor Yellow
Write-Host ""

& "workoutapi\Scripts\python.exe" -m uvicorn workoutapi.main:app --host 127.0.0.1 --port 8000 --reload

Write-Host ""
Write-Host "Backend finalizado." -ForegroundColor Yellow
Write-Host "Feche a janela do frontend manualmente se necessario." -ForegroundColor Cyan