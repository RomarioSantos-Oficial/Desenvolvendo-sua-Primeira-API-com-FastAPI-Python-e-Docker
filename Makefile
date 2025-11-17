# === Comandos principais ===
run:
	cd workoutapi && .\Scripts\python.exe -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

create-migration:
	@PYTHONPATH=$PYTHONPATH:$(pwd) alembic revision --autogenerate -m "$(message)"

run-migrations:
	@PYTHONPATH=$PYTHONPATH:$(pwd) alembic upgrade head

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

# # === SQLite (banco local) ===
# db-shell:
# 	cd workoutapi\database && sqlite3 workout.db

# db-tables:
# 	cd workoutapi\database && sqlite3 workout.db ".tables"

# db-schema:
# 	cd workoutapi\database && sqlite3 workout.db ".schema"

# db-users:
# 	cd workoutapi\database && sqlite3 workout.db "SELECT * FROM users;"

# db-workouts:
# 	cd workoutapi\database && sqlite3 workout.db "SELECT * FROM workouts;"

# db-backup:
# 	cd workoutapi\database && sqlite3 workout.db ".backup workout_backup.db"

# db-reset:
# 	cd workoutapi\database && del workout.db

# # === Comandos Docker (opcional) ===
# docker-up:
# 	docker-compose up -d

# docker-down:
# 	docker-compose down

# docker-logs:
# 	docker-compose logs -f

# # === Limpeza e manutenção ===
# clean:
# 	@echo "Limpando arquivos temporarios..."
# 	cd workoutapi && if exist __pycache__ rmdir /s /q __pycache__
# 	cd workoutapi && if exist .pytest_cache rmdir /s /q .pytest_cache
# 	cd workoutapi\database && if exist __pycache__ rmdir /s /q __pycache__
# 	@echo "Limpeza concluida!"

# reset-env:
# 	@echo "ATENCAO: Isso ira recriar o ambiente virtual!"
# 	@echo "Pressione Ctrl+C para cancelar ou Enter para continuar"
# 	@pause
# 	rmdir /s /q workoutapi
# 	python -m venv workoutapi
# 	make setup

# # === Informações e ajuda ===
# status:
# 	@echo "=== Status do Projeto WorkoutAPI ==="
# 	@echo "Estrutura:"
# 	@if exist workoutapi\main.py echo "  ✓ main.py encontrado"
# 	@if exist workoutapi\.env echo "  ✓ .env encontrado"
# 	@if exist workoutapi\database\database.py echo "  ✓ database.py encontrado"
# 	@if exist workoutapi\database\workout.db echo "  ✓ workout.db encontrado"
# 	@if exist requirements.txt echo "  ✓ requirements.txt encontrado"
# 	@echo "Para iniciar: make run"

# help:
# 	@echo "=== WorkoutAPI - Comandos Disponíveis ==="
# 	@echo ""
# 	@echo "📚 Principais:"
# 	@echo "  make run          - Inicia servidor FastAPI (produção)"
# 	@echo "  make dev          - Inicia servidor (desenvolvimento)"
# 	@echo "  make setup        - Configura ambiente completo"
# 	@echo "  make install      - Instala dependências"
# 	@echo ""
# 	@echo "🔄 Migrações (Alembic):"
# 	@echo "  make migration message='desc' - Criar migração"
# 	@echo "  make migrate      - Aplicar migrações"
# 	@echo "  make migrate-down - Reverter última migração"
# 	@echo "  make migrate-history - Histórico de migrações"
# 	@echo ""
# 	@echo "🗄️  Banco de dados (SQLite):"
# 	@echo "  make db-shell     - Abre shell SQLite"
# 	@echo "  make db-tables    - Lista tabelas"
# 	@echo "  make db-users     - Mostra usuários"
# 	@echo "  make db-workouts  - Mostra workouts"
# 	@echo "  make db-backup    - Backup do banco"
# 	@echo ""
# 	@echo "🛠️  Manutenção:"
# 	@echo "  make clean        - Limpa arquivos temporários"
# 	@echo "  make status       - Status do projeto"
# 	@echo "  make freeze       - Atualiza requirements.txt"
# 	@echo "  make help         - Mostra esta ajuda"
# 	@echo ""