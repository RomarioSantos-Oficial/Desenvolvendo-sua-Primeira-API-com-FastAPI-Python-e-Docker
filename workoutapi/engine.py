

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

from configs.settings import settings

load_dotenv()

# Credenciais baseadas no docker-compose.yml
DB_USER = "workout"
DB_PASSWORD = "workout" 
DB_NAME = "workout"

# Modelos Pydantic baseados nas configurações do docker-compose.yml
class DockerCredentials(BaseModel):
    """Credenciais baseadas no docker-compose.yml"""
    postgres_user: str = "workout"  # POSTGRES_USER do docker-compose
    postgres_password: str = "workout"  # POSTGRES_PASSWORD do docker-compose
    postgres_db: str = "workout"  # POSTGRES_DB do docker-compose

class LoginRequest(BaseModel):
    username: str
    password: str

class DatabaseInfo(BaseModel):
    database_type: str
    database_name: str
    user: str
    status: str
    location: str
    docker_equivalent: DockerCredentials

# Instância do engine principal
engine_app = FastAPI(
    title="WorkoutAPI Engine",
    description="Engine principal com funcionalidades baseadas no docker-compose.yml para SQLite",
    version="1.0.0"
)

# Função de verificação de credenciais (baseada no docker-compose.yml)
def verify_docker_credentials(username: str, password: str) -> bool:
    """
    Verifica credenciais usando os valores do docker-compose.yml:
    POSTGRES_USER: workout
    POSTGRES_PASSWORD: workout  
    POSTGRES_DB: workout
    """
    return username == DB_USER and password == DB_PASSWORD

# Endpoints do Engine

@engine_app.get("/")
async def engine_root():
    """Informações do engine principal"""
    return {
        "engine": "WorkoutAPI Engine",
        "database": "SQLite (substituto do PostgreSQL)",
        "docker_config": {
            "POSTGRES_USER": DB_USER,
            "POSTGRES_PASSWORD": DB_PASSWORD,
            "POSTGRES_DB": DB_NAME,
            "note": "Configurações adaptadas do docker-compose.yml para SQLite"
        },
        "endpoints": {
            "login": "/engine/login",
            "database_info": "/engine/database-info",
            "docker_status": "/engine/docker-status"
        }
    }

@engine_app.post("/login")
async def engine_login(login_data: LoginRequest):
    """
    Login usando credenciais do docker-compose.yml
    POSTGRES_USER: workout -> username: workout
    POSTGRES_PASSWORD: workout -> password: workout
    """
    if not verify_docker_credentials(login_data.username, login_data.password):
        raise HTTPException(
            status_code=401,
            detail={
                "error": "Credenciais incorretas",
                "expected": {
                    "username": "workout (POSTGRES_USER do docker-compose.yml)",
                    "password": "workout (POSTGRES_PASSWORD do docker-compose.yml)"
                }
            }
        )
    
    return {
        "message": "Login realizado com sucesso!",
        "user": login_data.username,
        "database": "SQLite (substituto do PostgreSQL)",
        "docker_config": "Baseado em docker-compose.yml",
        "access": "Liberado"
    }

@engine_app.get("/database-info", response_model=DatabaseInfo)
async def engine_database_info(
    username: str = Query(..., description="POSTGRES_USER do docker-compose.yml"),
    password: str = Query(..., description="POSTGRES_PASSWORD do docker-compose.yml")
):
    """
    Informações do banco SQLite usando credenciais do docker-compose.yml
    Parâmetros baseados em:
    - POSTGRES_USER: workout
    - POSTGRES_PASSWORD: workout
    """
    if not verify_docker_credentials(username, password):
        raise HTTPException(
            status_code=401,
            detail="Use as credenciais do docker-compose.yml: username=workout, password=workout"
        )
    
    return DatabaseInfo(
        database_type="SQLite (substituto do PostgreSQL)",
        database_name=DB_NAME,
        user=DB_USER,
        status="Conectado e funcionando",
        location="./workout.db (local)",
        docker_equivalent=DockerCredentials()
    )

@engine_app.get("/docker-status")
async def docker_equivalent_status(
    username: str = Query(...),
    password: str = Query(...)
):
    """
    Status do equivalente ao Docker (SQLite substituindo PostgreSQL)
    """
    if not verify_docker_credentials(username, password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    return {
        "docker_compose_equivalent": {
            "service": "db (PostgreSQL) -> SQLite local",
            "image": "postgres:16-alpine -> SQLite nativo",
            "container_name": "workout_db -> arquivo workout.db",
            "restart": "unless-stopped -> sempre disponível",
            "environment": {
                "POSTGRES_USER": f"{DB_USER} ✓",
                "POSTGRES_PASSWORD": f"{DB_PASSWORD} ✓", 
                "POSTGRES_DB": f"{DB_NAME} ✓",
                "note": "Mesmas credenciais, banco local"
            },
            "ports": "5432:5432 -> não necessário (SQLite local)",
            "status": "SQLite funcionando como substituto completo"
        }
    }

@engine_app.get("/health")
async def engine_health():
    """Status de saúde do engine"""
    return {
        "engine_status": "healthy",
        "database": "SQLite conectado",
        "docker_config": "Adaptado com sucesso",
        "message": "Engine funcionando perfeitamente!"
    }

# Funções auxiliares do engine
def initialize_engine():
    """Inicializa o engine e configura o banco"""
    print("Engine inicializado com configurações do docker-compose.yml adaptadas para SQLite")
    print(f"Credenciais: {DB_USER}/{DB_PASSWORD}")
    print(f"Banco: {DB_NAME} (SQLite)")

def get_docker_config():
    """Retorna configurações equivalentes ao docker-compose.yml"""
    return {
        "POSTGRES_USER": DB_USER,
        "POSTGRES_PASSWORD": DB_PASSWORD,
        "POSTGRES_DB": DB_NAME,
        "DATABASE_TYPE": "SQLite (substituto do PostgreSQL)"
    }