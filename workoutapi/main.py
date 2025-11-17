from fastapi import FastAPI
from engine import engine_app, initialize_engine
from routers import api_router

# Aplicativo principal (apenas inicializador)
app = FastAPI(
    title="WorkoutAPI",
    description="API de treinos com configurações do docker-compose.yml adaptadas para SQLite",
    version="1.0.0"
)

# Inclui os roteadores da API
app.include_router(api_router)

# Monta o engine principal
app.mount("/engine", engine_app)

# Inicialização na startup
@app.on_event("startup")
async def startup_event():
    """Inicializa o sistema com configurações do docker-compose.yml"""
    initialize_engine()

# Endpoint raiz apenas redireciona para o engine
@app.get("/")
async def root():
    """Endpoint raiz - redireciona para funcionalidades do engine"""
    return {
        "message": "WorkoutAPI - Inicializador Principal",
        "note": "Configurações baseadas no docker-compose.yml adaptadas para SQLite",
        "docker_equivalent": {
            "POSTGRES_USER": "workout",
            "POSTGRES_PASSWORD": "workout", 
            "POSTGRES_DB": "workout"
        },
        "engine": "/engine (funcionalidades principais)",
        "docs": "/docs",
        "engine_docs": "/engine/docs"
    }

