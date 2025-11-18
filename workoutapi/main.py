from fastapi import FastAPI
from engine import engine_app, initialize_engine
from routers import api_router
# from database.seed_data import create_seed_data
from database.database import async_session

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
    
    # Criar tabelas manualmente com seed data integrado
    from database.database import async_engine
    from sqlalchemy import text
    
    async with async_engine.connect() as conn:
        trans = await conn.begin()
        # Criar tabelas
        await conn.execute(text("""
            CREATE TABLE IF NOT EXISTS categorias (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome VARCHAR(50) UNIQUE NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """))
        
        await conn.execute(text("""
            CREATE TABLE IF NOT EXISTS centro_treinamento (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome VARCHAR(50) UNIQUE NOT NULL,
                endereco VARCHAR(60) NOT NULL,
                proprietario VARCHAR(20) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """))
        
        await conn.execute(text("""
            CREATE TABLE IF NOT EXISTS atletas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome VARCHAR(50) NOT NULL,
                cpf VARCHAR(11) UNIQUE NOT NULL,
                idade INTEGER NOT NULL,
                peso REAL NOT NULL,
                altura REAL NOT NULL,
                sexo VARCHAR(1) NOT NULL,
                categoria_id INTEGER NOT NULL,
                centro_treinamento_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (categoria_id) REFERENCES categorias (id),
                FOREIGN KEY (centro_treinamento_id) REFERENCES centro_treinamento (id)
            )
        """))
        
        await trans.commit()
        
    # Inserir dados iniciais usando o módulo seed_data
    from database.seed_data import create_seed_data
    from database.database import async_session
    
    async with async_session() as session:
        await create_seed_data(session)
    
    print("✅ Tabelas criadas e dados iniciais inseridos com sucesso!")

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

