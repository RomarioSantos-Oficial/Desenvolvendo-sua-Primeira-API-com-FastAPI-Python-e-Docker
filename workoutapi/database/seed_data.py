"""
Dados iniciais (seed data) para o banco de dados WorkoutAPI
"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from categorias.models import CategoriaModel
from centro_treinamento.models import CentroTreinamentoModel


async def create_seed_data(db_session: AsyncSession):
    """
    Cria dados iniciais no banco de dados se não existirem
    """
    
    # Verificar se já existem dados
    categorias_existentes = (await db_session.execute(select(CategoriaModel))).scalars().all()
    centros_existentes = (await db_session.execute(select(CentroTreinamentoModel))).scalars().all()
    
    if categorias_existentes and centros_existentes:
        print("✅ Dados iniciais já existem no banco de dados")
        return
    
    print("🌱 Criando dados iniciais no banco de dados...")
    
    # Categorias iniciais
    categorias_seed = [
        {"nome": "Scale"},
        {"nome": "Fit"},
        {"nome": "Crossfit"},
        {"nome": "Powerlifting"},
        {"nome": "Cardio"},
        {"nome": "Yoga"},
        {"nome": "Pilates"},
        {"nome": "Natação"},
    ]
    
    # Centros de treinamento iniciais
    centros_seed = [
        {
            "nome": "Academia",
            "endereco": "Rua das Flores, 123",
            "proprietario": "João Silva"
        },
        {
            "nome": "Ct Brasil",
            "endereco": "Av. Brasil, 456",
            "proprietario": "Maria Santos"
        },
        {
            "nome": "Ct Kings",
            "endereco": "Rua dos Reis, 789",
            "proprietario": "Pedro Costa"
        },
        {
            "nome": "FitCenter",
            "endereco": "Rua da Saúde, 321",
            "proprietario": "Ana Lima"
        },
        {
            "nome": "PowerGym",
            "endereco": "Av. Força, 654",
            "proprietario": "Carlos Rocha"
        }
    ]
    
    # Criar categorias se não existirem
    if not categorias_existentes:
        for categoria_data in categorias_seed:
            categoria = CategoriaModel(**categoria_data)  # pk_id será auto-incrementado
            db_session.add(categoria)
        print(f"✅ Criadas {len(categorias_seed)} categorias iniciais")
    
    # Criar centros de treinamento se não existirem
    if not centros_existentes:
        for centro_data in centros_seed:
            centro = CentroTreinamentoModel(**centro_data)  # pk_id será auto-incrementado
            db_session.add(centro)
        print(f"✅ Criados {len(centros_seed)} centros de treinamento iniciais")
    
    # Salvar no banco
    await db_session.commit()
    print("🎉 Dados iniciais criados com sucesso!")


async def reset_seed_data(db_session: AsyncSession):
    """
    Limpa e recria todos os dados iniciais (use com cuidado!)
    """
    print("🧹 Limpando dados existentes...")
    
    # Deletar dados existentes
    await db_session.execute("DELETE FROM atletas")
    await db_session.execute("DELETE FROM categorias")  
    await db_session.execute("DELETE FROM centro_treinamento")
    
    await db_session.commit()
    
    # Recriar dados iniciais
    await create_seed_data(db_session)