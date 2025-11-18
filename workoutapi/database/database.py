
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from configs.settings import settings

# Base para os modelos
Base = declarative_base()

# Engine assíncrono
async_engine = create_async_engine(settings.DB_URL, echo=False)

# SessionMaker para criar sessões assíncronas
async_session = sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Dependency para obter uma sessão do banco
async def get_session():
    async with async_session() as session:
        yield session