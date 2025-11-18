#!/usr/bin/env python3
"""
Script para gerenciar dados iniciais (seed data) da WorkoutAPI
"""
import asyncio
import sys
import os
import sqlite3
from datetime import datetime


async def create_seed_data():
    """
    Cria dados iniciais no banco SQLite diretamente
    """
    db_path = os.path.join(os.path.dirname(__file__), "storage", "workout.db")
    
    if not os.path.exists(db_path):
        print("❌ Banco de dados não encontrado. Execute a aplicação primeiro.")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Verificar se já existem dados
        cursor.execute("SELECT COUNT(*) FROM categorias")
        categorias_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM centro_treinamento")
        centros_count = cursor.fetchone()[0]
        
        if categorias_count > 0 and centros_count > 0:
            print("✅ Dados iniciais já existem no banco de dados")
            return
        
        print("🌱 Criando dados iniciais no banco de dados...")
        
        # Inserir categorias
        categorias = ['Scale', 'Fit', 'Crossfit', 'Powerlifting', 'Cardio', 'Yoga', 'Pilates', 'Natação']
        for categoria in categorias:
            cursor.execute("INSERT OR IGNORE INTO categorias (nome) VALUES (?)", (categoria,))
        
        # Inserir centros de treinamento
        centros = [
            ('Academia', 'Rua das Flores, 123', 'João Silva'),
            ('Ct Brasil', 'Av. Brasil, 456', 'Maria Santos'),
            ('Ct Kings', 'Rua dos Reis, 789', 'Pedro Costa'),
            ('FitCenter', 'Rua da Saúde, 321', 'Ana Lima'),
            ('PowerGym', 'Av. Força, 654', 'Carlos Rocha')
        ]
        for nome, endereco, proprietario in centros:
            cursor.execute("INSERT OR IGNORE INTO centro_treinamento (nome, endereco, proprietario) VALUES (?, ?, ?)", 
                         (nome, endereco, proprietario))
        
        conn.commit()
        print(f"✅ Criadas {len(categorias)} categorias iniciais")
        print(f"✅ Criados {len(centros)} centros de treinamento iniciais")
        print("🎉 Dados iniciais criados com sucesso!")
        
    except Exception as e:
        print(f"❌ Erro ao criar dados: {e}")
        conn.rollback()
    finally:
        conn.close()


async def reset_seed_data():
    """
    Limpa e recria todos os dados iniciais (use com cuidado!)
    """
    db_path = os.path.join(os.path.dirname(__file__), "storage", "workout.db")
    
    if not os.path.exists(db_path):
        print("❌ Banco de dados não encontrado.")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        print("🧹 Limpando dados existentes...")
        
        # Deletar dados existentes (respeitando foreign keys)
        cursor.execute("DELETE FROM atletas")
        cursor.execute("DELETE FROM categorias")  
        cursor.execute("DELETE FROM centro_treinamento")
        
        conn.commit()
        print("✅ Dados limpos com sucesso!")
        
        # Recriar dados iniciais
        await create_seed_data()
        
    except Exception as e:
        print(f"❌ Erro ao resetar dados: {e}")
        conn.rollback()
    finally:
        conn.close()


async def main():
    if len(sys.argv) != 2:
        print("Uso: python manage_seed.py [create|reset]")
        sys.exit(1)
    
    action = sys.argv[1].lower()
    
    if action not in ['create', 'reset']:
        print("Ação inválida. Use 'create' ou 'reset'")
        sys.exit(1)
    
    if action == 'create':
        await create_seed_data()
    elif action == 'reset':
        await reset_seed_data()
    
    print("✅ Operação concluída com sucesso!")


if __name__ == "__main__":
    asyncio.run(main())