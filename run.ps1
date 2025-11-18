#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Script para iniciar a WorkoutAPI (Backend + Frontend)

.DESCRIPTION
    Este script inicia automaticamente o servidor FastAPI (backend) e
    o servidor de desenvolvimento React (frontend) em terminais separados.

.PARAMETER Mode
    Modo de execução: 'dev' para desenvolvimento, 'prod' para produção, 'backend' só backend

.PARAMETER Frontend
    Se deve iniciar o frontend junto (padrão: $true em modo dev)

.EXAMPLE
    .\run.ps1                    # Inicia backend + frontend
    .\run.ps1 -Mode backend      # Inicia apenas o backend
    .\run.ps1 -Frontend:$false   # Inicia apenas o backend
#>

param(
    [Parameter()]
    [ValidateSet('dev', 'prod', 'backend')]
    [string]$Mode = 'dev',
    
    [Parameter()]
    [bool]$Frontend = $true
)

# Cores para output
$Green = [ConsoleColor]::Green
$Yellow = [ConsoleColor]::Yellow
$Red = [ConsoleColor]::Red
$Cyan = [ConsoleColor]::Cyan
$Blue = [ConsoleColor]::Blue

function Write-ColorText {
    param([string]$Text, [ConsoleColor]$Color)
    Write-Host $Text -ForegroundColor $Color
}

Write-ColorText "🏋️‍♂️ WORKOUT API - Iniciando aplicação..." $Cyan
Write-ColorText "=========================================" $Cyan
Write-ColorText "📁 Diretório: $(Get-Location)" $Yellow

# Desabilita frontend em modo backend ou prod
if ($Mode -eq 'backend' -or $Mode -eq 'prod') {
    $Frontend = $false
}

# Verifica se está no diretório correto
if (-not (Test-Path "workoutapi\main.py")) {
    Write-ColorText "❌ Erro: Arquivo main.py não encontrado!" $Red
    Write-ColorText "💡 Execute este script do diretório raiz do projeto" $Yellow
    exit 1
}

# Cria diretório do banco se não existir
if (-not (Test-Path "database\storage")) {
    Write-ColorText "📂 Criando diretório do banco de dados..." $Yellow
    New-Item -ItemType Directory -Path "database\storage" -Force | Out-Null
}

# Verifica se o ambiente virtual existe
if (-not (Test-Path "workoutapi\Scripts\python.exe")) {
    Write-ColorText "❌ Erro: Ambiente virtual não encontrado!" $Red
    Write-ColorText "💡 Execute: python -m venv workoutapi" $Yellow
    exit 1
}

# Função para iniciar o frontend
function Start-Frontend {
    if ($Frontend -and (Test-Path "Frontend\workout-frontend")) {
        Write-ColorText "⚛️ Iniciando Frontend (React + Vite)..." $Blue
        $frontendPath = Join-Path (Get-Location) "Frontend\workout-frontend"
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host '💻 FRONTEND - React Development Server' -ForegroundColor Blue; npm run dev"
        Write-ColorText "🌐 Frontend será iniciado em: http://localhost:5173" $Cyan
    }
}

try {
    # Verifica se as dependências estão instaladas
    $uvicornInstalled = & "workoutapi\Scripts\pip.exe" show uvicorn 2>$null
    if (-not $uvicornInstalled) {
        Write-ColorText "📦 Instalando dependências..." $Yellow
        & "workoutapi\Scripts\pip.exe" install uvicorn fastapi sqlalchemy pydantic pydantic-settings
    }
    
    # Configura parâmetros baseado no modo
    if ($Mode -eq 'prod') {
        Write-ColorText "🚀 Iniciando em modo PRODUÇÃO..." $Green
        $host_param = "0.0.0.0"
        $port_param = "8000"
        $reload_param = $false
    } else {
        Write-ColorText "🔥 Iniciando em modo DESENVOLVIMENTO..." $Green
        $host_param = "127.0.0.1"
        $port_param = "8000"
        $reload_param = $true
    }
    
    # Inicia o frontend se solicitado
    if ($Frontend) {
        Start-Frontend
        Start-Sleep -Seconds 2
    }
    
    Write-ColorText "🌐 Backend será iniciado em: http://$host_param`:$port_param" $Cyan
    Write-ColorText "📚 Documentação: http://$host_param`:$port_param/docs" $Cyan
    Write-ColorText "🛑 Para parar: Ctrl+C" $Yellow
    Write-Host ""
    
    # Inicia o servidor backend
    Write-ColorText "🚀 Iniciando servidor FastAPI..." $Green
    if ($reload_param) {
        & "workoutapi\Scripts\python.exe" -m uvicorn workoutapi.main:app --host $host_param --port $port_param --reload
    } else {
        & "workoutapi\Scripts\python.exe" -m uvicorn workoutapi.main:app --host $host_param --port $port_param
    }
    
} catch {
    Write-ColorText "❌ Erro ao iniciar o servidor: $($_.Exception.Message)" $Red
    Write-ColorText "🔍 Verifique se todas as dependências estão instaladas." $Yellow
    exit 1
} finally {
    Write-ColorText "🛑 Servidor finalizado." $Yellow
    if ($Frontend) {
        Write-ColorText "💡 Feche as janelas do frontend manualmente se necessário." $Cyan
    }
}