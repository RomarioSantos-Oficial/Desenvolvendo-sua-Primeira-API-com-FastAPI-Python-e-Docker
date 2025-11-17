#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Script para iniciar a WorkoutAPI

.DESCRIPTION
    Este script ativa o ambiente virtual Python e inicia o servidor FastAPI
    com configurações otimizadas para desenvolvimento.

.PARAMETER Mode
    Modo de execução: 'dev' para desenvolvimento ou 'prod' para produção

.EXAMPLE
    .\run.ps1
    .\run.ps1 -Mode dev
    .\run.ps1 -Mode prod
#>

param(
    [Parameter()]
    [ValidateSet('dev', 'prod')]
    [string]$Mode = 'dev'
)

# Cores para output
$Green = [ConsoleColor]::Green
$Yellow = [ConsoleColor]::Yellow
$Red = [ConsoleColor]::Red
$Cyan = [ConsoleColor]::Cyan

function Write-ColorText {
    param([string]$Text, [ConsoleColor]$Color)
    Write-Host $Text -ForegroundColor $Color
}

Write-ColorText "Iniciando WorkoutAPI..." $Cyan
Write-ColorText "Diretorio: $(Get-Location)" $Yellow

# Verifica se está no diretório correto
if (-not (Test-Path "workoutapi\main.py")) {
    Write-ColorText "Erro: Arquivo main.py nao encontrado!" $Red
    Write-ColorText "Execute este script do diretorio raiz do projeto" $Yellow
    exit 1
}

# Verifica se o ambiente virtual existe
if (-not (Test-Path "workoutapi\Scripts\Activate.ps1")) {
    Write-ColorText "Erro: Ambiente virtual nao encontrado!" $Red
    Write-ColorText "Execute: python -m venv workoutapi" $Yellow
    exit 1
}

# Navega para o diretório do projeto
Set-Location workoutapi

try {
    # Ativa o ambiente virtual
    Write-ColorText "Ativando ambiente virtual..." $Yellow
    & ".\Scripts\Activate.ps1"
    
    # Verifica se as dependências estão instaladas
    $uvicornInstalled = & ".\Scripts\pip.exe" show uvicorn 2>$null
    if (-not $uvicornInstalled) {
        Write-ColorText "Instalando dependencias..." $Yellow
        & ".\Scripts\pip.exe" install -r "..\requirements.txt"
    }
    
    # Configura parâmetros baseado no modo
    if ($Mode -eq 'prod') {
        Write-ColorText "Iniciando em modo PRODUCAO..." $Green
        $host_param = "0.0.0.0"
        $port_param = "8000"
        $reload_param = $false
    } else {
        Write-ColorText "Iniciando em modo DESENVOLVIMENTO..." $Green
        $host_param = "127.0.0.1"
        $port_param = "8000"
        $reload_param = $true
    }
    
    Write-ColorText "Servidor rodara em: http://$host_param`:$port_param" $Cyan
    Write-ColorText "Documentacao: http://$host_param`:$port_param/docs" $Cyan
    Write-ColorText "Para parar: Ctrl+C" $Yellow
    Write-Host ""
    
    # Inicia o servidor
    if ($reload_param) {
        & ".\Scripts\python.exe" -m uvicorn main:app --host $host_param --port $port_param --reload
    } else {
        & ".\Scripts\python.exe" -m uvicorn main:app --host $host_param --port $port_param
    }
    
} catch {
    Write-ColorText "Erro ao iniciar o servidor: $($_.Exception.Message)" $Red
    exit 1
} finally {
    Write-ColorText "Servidor finalizado." $Yellow
}