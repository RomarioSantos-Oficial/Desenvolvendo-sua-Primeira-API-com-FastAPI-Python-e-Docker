#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Script de utilidades para WorkoutAPI

.DESCRIPTION
    Fornece comandos equivalentes ao Makefile para ambiente Windows

.PARAMETER Command
    Comando a ser executado: status, clean, install, freeze, help

.EXAMPLE
    .\utils.ps1 status
    .\utils.ps1 clean
    .\utils.ps1 help
#>

param(
    [Parameter(Mandatory)]
    [ValidateSet('status', 'clean', 'install', 'freeze', 'help')]
    [string]$Command
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

# Executar comando
switch ($Command) {
    'status' { 
        Write-ColorText "=== Status do Projeto WorkoutAPI ===" $Cyan
        Write-ColorText "Estrutura:" $Yellow
        
        $checks = @(
            @{Path = "workoutapi\main.py"; Name = "main.py"},
            @{Path = "workoutapi\.env"; Name = ".env"},
            @{Path = "workoutapi\database\database.py"; Name = "database.py"},
            @{Path = "workoutapi\database\storage\workout.db"; Name = "workout.db"},
            @{Path = "workoutapi\database\seed_data.py"; Name = "seed_data.py"},
            @{Path = "workoutapi\database\manage_seed.py"; Name = "manage_seed.py"},
            @{Path = "requirements.txt"; Name = "requirements.txt"},
            @{Path = "run.ps1"; Name = "run.ps1"},
            @{Path = "seed.ps1"; Name = "seed.ps1"}
        )
        
        foreach ($check in $checks) {
            if (Test-Path $check.Path) {
                Write-ColorText "  ✅ $($check.Name) encontrado" $Green
            } else {
                Write-ColorText "  ❌ $($check.Name) não encontrado" $Red
            }
        }
        
        Write-ColorText "`nPara iniciar: .\run.ps1" $Blue
        Write-ColorText "Para dados seed: .\seed.ps1 create" $Blue
    }
    
    'clean' { 
        Write-ColorText "🧹 Limpando arquivos temporários..." $Yellow
        
        $cleanPaths = @(
            "workoutapi\__pycache__",
            "workoutapi\.pytest_cache",
            "workoutapi\database\__pycache__",
            "workoutapi\atleta\__pycache__",
            "workoutapi\categorias\__pycache__", 
            "workoutapi\centro_treinamento\__pycache__",
            "workoutapi\contrib\__pycache__"
        )
        
        foreach ($path in $cleanPaths) {
            if (Test-Path $path) {
                Remove-Item $path -Recurse -Force
                Write-ColorText "  🗑️  Removido: $path" $Green
            }
        }
        
        Write-ColorText "✅ Limpeza concluída!" $Green
    }
    
    'install' { 
        Write-ColorText "📦 Instalando dependências..." $Yellow
        
        if (-not (Test-Path "workoutapi\Scripts\python.exe")) {
            Write-ColorText "❌ Ambiente virtual não encontrado!" $Red
            return
        }
        
        Set-Location workoutapi
        & ".\Scripts\pip.exe" install -r "..\requirements.txt"
        Set-Location ..
        Write-ColorText "✅ Dependências instaladas!" $Green
    }
    
    'freeze' { 
        Write-ColorText "🔒 Atualizando requirements.txt..." $Yellow
        
        if (-not (Test-Path "workoutapi\Scripts\python.exe")) {
            Write-ColorText "❌ Ambiente virtual não encontrado!" $Red
            return
        }
        
        Set-Location workoutapi
        & ".\Scripts\pip.exe" freeze > "..\requirements.txt"
        Set-Location ..
        Write-ColorText "✅ requirements.txt atualizado!" $Green
    }
    
    'help' { 
        Write-ColorText "=== WorkoutAPI - Comandos Disponiveis ===" $Cyan
        Write-Host ""
        Write-ColorText "Principais:" $Blue
        Write-Host "  .\run.ps1          - Inicia servidor FastAPI"
        Write-Host "  .\run.ps1 -Mode dev - Modo desenvolvimento"
        Write-Host "  .\run.ps1 -Mode prod - Modo producao"
        Write-Host ""
        Write-ColorText "Dados Seed:" $Blue
        Write-Host "  .\seed.ps1 create  - Criar/verificar dados iniciais"
        Write-Host "  .\seed.ps1 reset   - Reset completo (ATENCAO!)"
        Write-Host ""
        Write-ColorText "Utilitarios:" $Blue
        Write-Host "  .\utils.ps1 status - Status do projeto"
        Write-Host "  .\utils.ps1 clean  - Limpar arquivos temporarios"
        Write-Host "  .\utils.ps1 install - Instalar dependencias"
        Write-Host "  .\utils.ps1 freeze - Atualizar requirements.txt"
        Write-Host ""
        Write-ColorText "Documentacao:" $Blue
        Write-Host "  http://127.0.0.1:8000/docs - Swagger UI"
        Write-Host "  http://127.0.0.1:8000/redoc - ReDoc"
        Write-Host ""
    }
}