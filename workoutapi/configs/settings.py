from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    # SQLite assíncrono usando aiosqlite
    DB_URL: str = Field(default="sqlite+aiosqlite:///./database/workout.db", env="DATABASE_URL")
    
    model_config = {
        "env_file": ".env",
        "extra": "ignore"  # Ignora campos extras do .env
    }
    
settings = Settings()