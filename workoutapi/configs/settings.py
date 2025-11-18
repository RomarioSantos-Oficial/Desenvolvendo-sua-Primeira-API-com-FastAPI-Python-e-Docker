from pydantic_settings import BaseSettings
from pydantic import Field
import os
from pathlib import Path

class Settings(BaseSettings):
    # SQLite assíncrono usando aiosqlite - Caminho absoluto padronizado
    @property
    def DB_URL(self) -> str:
        # Caminho absoluto para o banco de dados (sempre no diretório raiz do projeto)
        project_root = Path(__file__).parent.parent.parent  # Vai para WORKOUT_API/
        db_path = project_root / "database" / "storage" / "workout.db"
        # Cria o diretório se não existir
        db_path.parent.mkdir(parents=True, exist_ok=True)
        print(f"🔍 Usando banco de dados: {db_path.absolute()}")
        return f"sqlite+aiosqlite:///{db_path}"
    
    model_config = {
        "env_file": ".env",
        "extra": "ignore"  # Ignora campos extras do .env
    }
    
settings = Settings()