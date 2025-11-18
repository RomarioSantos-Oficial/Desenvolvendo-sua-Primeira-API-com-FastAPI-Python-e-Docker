import sys
import os
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from alembic import context

# Configuração do caminho para importar módulos da aplicação
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))


# Configuração do Alembic
config = context.config  # pylint: disable=no-member

# Importações da aplicação WorkoutAPI
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "workoutapi"))

try:
    # Importa a Base e todos os modelos
    from database.database import Base
    from atleta.models import AtletaModel  # noqa: F401
    from categorias.models import CategoriaModel  # noqa: F401
    from centro_treinamento.models import CentroTreinamentoModel  # noqa: F401

    target_metadata = Base.metadata
except ImportError as e:
    print(f"Erro ao importar modelos: {e}")
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
    context.configure(  # pylint: disable=no-member
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():  # pylint: disable=no-member
        context.run_migrations()  # pylint: disable=no-member


def do_run_migrations(connection: Connection) -> None:
    """Configura e executa migrações com conexão fornecida"""
    context.configure(connection=connection, target_metadata=target_metadata)  # pylint: disable=no-member

    with context.begin_transaction():  # pylint: disable=no-member
        context.run_migrations()  # pylint: disable=no-member


def run_migrations_online() -> None:
    """
    Executa migrações em modo online de forma síncrona
    """
    database_url = config.get_main_option("sqlalchemy.url")
    
    # Para SQLite, usar engine síncrono
    if database_url.startswith("sqlite"):
        from sqlalchemy import create_engine
        connectable = create_engine(database_url, poolclass=pool.NullPool)
        
        with connectable.connect() as connection:
            do_run_migrations(connection)
    else:
        # Para outros bancos, manter async
        import asyncio
        from sqlalchemy.ext.asyncio import create_async_engine
        
        async def run_async_migrations():
            connectable = create_async_engine(database_url, poolclass=pool.NullPool)
            async with connectable.connect() as connection:
                await connection.run_sync(do_run_migrations)
            await connectable.dispose()
        
        asyncio.run(run_async_migrations())


# Executa migrações baseado no modo (offline ou online)
if context.is_offline_mode():  # pylint: disable=no-member
    run_migrations_offline()
else:
    run_migrations_online()
