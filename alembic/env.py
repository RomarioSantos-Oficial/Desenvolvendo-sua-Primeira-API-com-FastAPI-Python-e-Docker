import sys
import os
import asyncio
from logging.config import fileConfig

from sqlalchemy import async_engine_from_config, engine_from_config, pool
from sqlalchemy.engine import Connection
from alembic import context

# Configuração do caminho para importar módulos da aplicação
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))


# Configuração do Alembic
config = context.config

# Importações da aplicação WorkoutAPI
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "workoutapi"))

try:
    from database.database import Base
    target_metadata = Base.metadata
except ImportError:
    # Fallback caso não encontre os modelos
    target_metadata = None

# Configura logging se disponível
if config.config_file_name is not None:
    fileConfig(config.config_file_name)


def run_migrations_offline() -> None:
    """
    Executa migrações em modo offline (sem conexão ativa)
    Usado para gerar scripts SQL
    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    """Configura e executa migrações com conexão fornecida"""
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """Executa migrações de forma assíncrona"""
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)


def run_migrations_online() -> None:
    """
    Executa migrações em modo online com suporte async/sync
    """
    asyncio.run(run_async_migrations())


# Executa migrações baseado no modo (offline ou online)
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
