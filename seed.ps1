#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Script para gerenciar dados iniciais da WorkoutAPI

.DESCRIPTION
    Este script permite criar ou resetar dados iniciais no banco de dados

.PARAMETER Action
    Ação a ser executada: 'create' para criar dados ou 'reset' para resetar

.EXAMPLE
    .\seed.ps1 create
    .\seed.ps1 reset
#>

param(
    [Parameter(Mandatory)]
    [ValidateSet('create', 'reset')]
    [string]$Action
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

Write-ColorText "=== WorkoutAPI - Gerenciador de Dados Iniciais ===" $Cyan

# Verifica se está no diretório correto
if (-not (Test-Path "workoutapi\database\manage_seed.py")) {
    Write-ColorText "Erro: Script manage_seed.py nao encontrado!" $Red
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
    
    # Executa o comando de seed
    if ($Action -eq 'reset') {
        Write-ColorText "ATENCAO: Isso ira apagar TODOS os dados!" $Red
        $confirm = Read-Host "Digite 'sim' para confirmar"
        if ($confirm -ne 'sim') {
            Write-ColorText "Operacao cancelada." $Yellow
            exit 0
        }
    }
    
    Write-ColorText "Executando: $Action" $Green
    & ".\Scripts\python.exe" -m database.manage_seed $Action
    
    Write-ColorText "Operacao concluida!" $Green
    
} catch {
    Write-ColorText "Erro: $($_.Exception.Message)" $Red
    exit 1
}