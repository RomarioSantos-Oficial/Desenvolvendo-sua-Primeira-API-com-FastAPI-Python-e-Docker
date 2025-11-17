from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from configs.settings import settings

# Base para modelos SQLAlchemy
class Base(DeclarativeBase):
    pass

# Engine configurado para SQLite assíncrono
engine = create_async_engine(settings.DB_URL, echo=False)
async_session = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session

