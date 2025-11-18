# WorkoutAPI - Makefile
# Para ver todos os comandos disponíveis: make help

.DEFAULT_GOAL := help

# === Comandos principais ===
run:
	.\run.ps1

run-dev:
	.\run.ps1 -Mode dev

run-prod:
	.\run.ps1 -Mode prod

run-direct:
	cd workoutapi && .\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload

create-migration:
	@PYTHONPATH=$PYTHONPATH:$(pwd) alembic revision --autogenerate -m "$(message)"

run-migrations:
	@PYTHONPATH=$PYTHONPATH:$(pwd) alembic upgrade head

# === Gerenciamento de dados seed ===
seed-create:
	.\seed.ps1 create

seed-reset:
	.\seed.ps1 reset

# === Instalação e setup ===
install:
	cd workoutapi && .\Scripts\pip.exe install -r ..\requirements.txt

freeze:
	cd workoutapi && .\Scripts\pip.exe freeze > ..\requirements.txt

setup:
	@echo "Configurando ambiente..."
	cd workoutapi && .\Scripts\python.exe -m pip install --upgrade pip
	@echo "Instalando dependencias..."
	make install
	@echo "Ambiente configurado com sucesso!"

# dev:
# 	cd workoutapi && .\Scripts\python.exe -m uvicorn main:app --reload

# install:
# 	cd workoutapi && .\Scripts\pip.exe install -r ..\requirements.txt

# freeze:
# 	cd workoutapi && .\Scripts\pip.exe freeze > ..\requirements.txt

# setup:
# 	@echo "Configurando ambiente..."
# 	cd workoutapi && .\Scripts\python.exe -m pip install --upgrade pip
# 	@echo "Instalando dependencias..."
# 	make install
# 	@echo "Ambiente configurado com sucesso!"

# # === Alembic (migrações) ===
# migration:
# 	workoutapi\Scripts\python.exe -m alembic revision --autogenerate -m "$(message)"

# migrate:
# 	workoutapi\Scripts\python.exe -m alembic upgrade head

# migrate-down:
# 	workoutapi\Scripts\python.exe -m alembic downgrade -1

# migrate-history:
# 	workoutapi\Scripts\python.exe -m alembic history

# migrate-current:
# 	workoutapi\Scripts\python.exe -m alembic current

# migrate-reset:
# 	workoutapi\Scripts\python.exe -m alembic downgrade base

# check-db:
# 	cd workoutapi && .\Scripts\python.exe check_db.py

# === SQLite (banco local) ===
db-shell:
	cd workoutapi\database\storage && sqlite3 workout.db

db-tables:
	cd workoutapi\database\storage && sqlite3 workout.db ".tables"

db-schema:
	cd workoutapi\database\storage && sqlite3 workout.db ".schema"

db-categorias:
	cd workoutapi\database\storage && sqlite3 workout.db "SELECT * FROM categorias;"

db-centros:
	cd workoutapi\database\storage && sqlite3 workout.db "SELECT * FROM centro_treinamento;"

db-atletas:
	cd workoutapi\database\storage && sqlite3 workout.db "SELECT * FROM atletas;"

db-backup:
	cd workoutapi\database\storage && sqlite3 workout.db ".backup workout_backup_$(shell powershell -Command \"Get-Date -Format 'yyyyMMdd_HHmmss'\").db"

db-reset:
	cd workoutapi\database\storage && del workout.db

# # === Comandos Docker (opcional) ===
# docker-up:
# 	docker-compose up -d

# docker-down:
# 	docker-compose down

# docker-logs:
# 	docker-compose logs -f

# === Limpeza e manutenção ===
clean:
	@echo "Limpando arquivos temporarios..."
	cd workoutapi && if exist __pycache__ rmdir /s /q __pycache__
	cd workoutapi && if exist .pytest_cache rmdir /s /q .pytest_cache
	cd workoutapi\database && if exist __pycache__ rmdir /s /q __pycache__
	cd workoutapi\atleta && if exist __pycache__ rmdir /s /q __pycache__
	cd workoutapi\categorias && if exist __pycache__ rmdir /s /q __pycache__  
	cd workoutapi\centro_treinamento && if exist __pycache__ rmdir /s /q __pycache__
	cd workoutapi\contrib && if exist __pycache__ rmdir /s /q __pycache__
	@echo "Limpeza concluida!"

reset-env:
	@echo "ATENCAO: Isso ira recriar o ambiente virtual!"
	@echo "Pressione Ctrl+C para cancelar ou Enter para continuar"
	@pause
	rmdir /s /q workoutapi
	python -m venv workoutapi
	make setup

# === Informações e ajuda ===
status:
	@echo "=== Status do Projeto WorkoutAPI ==="
	@echo "Estrutura:"
	@if exist workoutapi\main.py echo "  ✓ main.py encontrado"
	@if exist workoutapi\.env echo "  ✓ .env encontrado"
	@if exist workoutapi\database\database.py echo "  ✓ database.py encontrado"
	@if exist workoutapi\database\storage\workout.db echo "  ✓ workout.db encontrado"
	@if exist workoutapi\database\seed_data.py echo "  ✓ seed_data.py encontrado"
	@if exist workoutapi\database\manage_seed.py echo "  ✓ manage_seed.py encontrado"
	@if exist requirements.txt echo "  ✓ requirements.txt encontrado"
	@if exist run.ps1 echo "  ✓ run.ps1 encontrado"
	@if exist seed.ps1 echo "  ✓ seed.ps1 encontrado"
	@echo "Para iniciar: make run ou .\\run.ps1"

help:
	@echo "=== WorkoutAPI - Comandos Disponíveis ==="
	@echo ""
	@echo "📚 Principais:"
	@echo "  make run          - Inicia servidor FastAPI (modo dev)"
	@echo "  make run-dev      - Inicia servidor (desenvolvimento)"
	@echo "  make run-prod     - Inicia servidor (produção)"
	@echo "  make run-direct   - Inicia servidor direto (sem script)"
	@echo "  make setup        - Configura ambiente completo"
	@echo "  make install      - Instala dependências"
	@echo ""
	@echo "🌱 Dados Seed:"
	@echo "  make seed-create  - Criar/verificar dados iniciais"
	@echo "  make seed-reset   - Reset completo do banco (CUIDADO!)"
	@echo ""
	@echo "🔄 Migrações (Alembic):"
	@echo "  make create-migration message='desc' - Criar migração"
	@echo "  make run-migrations - Aplicar migrações"
	@echo ""
	@echo "🗄️  Banco de dados (SQLite):"
	@echo "  make db-shell     - Abre shell SQLite"
	@echo "  make db-tables    - Lista tabelas"
	@echo "  make db-categorias - Mostra categorias"
	@echo "  make db-centros   - Mostra centros de treinamento"
	@echo "  make db-atletas   - Mostra atletas"
	@echo "  make db-schema    - Mostra schema do banco"
	@echo "  make db-backup    - Backup do banco com timestamp"
	@echo "  make db-reset     - Remove banco (CUIDADO!)"
	@echo ""
	@echo "🛠️  Manutenção:"
	@echo "  make clean        - Limpa arquivos temporários"
	@echo "  make status       - Status do projeto"
	@echo "  make freeze       - Atualiza requirements.txt"
	@echo "  make reset-env    - Recria ambiente virtual"
	@echo "  make help         - Mostra esta ajuda"
	@echo ""
	@echo "🚀 Scripts PowerShell (recomendados):"
	@echo "  .\\run.ps1        - Inicia aplicação"
	@echo "  .\\seed.ps1 create - Cria dados iniciais"
	@echo "  .\\seed.ps1 reset  - Reset dados (com confirmação)"
	@echo ""