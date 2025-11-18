# WorkoutAPI 🏋️‍♂️

API REST para gerenciamento de atletas, categorias e centros de treinamento, construída com FastAPI e SQLite.

## 📁 Estrutura do Projeto

```
WORKOUT_API/
├── 📄 run.ps1                  # Script principal para iniciar aplicação
├── 📄 seed.ps1                 # Script para gerenciar dados iniciais
├── 📄 Makefile                 # Comandos make disponíveis
├── 📄 requirements.txt         # Dependências Python
└── 📁 workoutapi/
    ├── 📄 main.py              # Aplicação FastAPI principal
    ├── 📄 engine.py            # Engine auxiliar (compatibilidade Docker)
    ├── 📄 routers.py           # Configuração de rotas
    ├── 📁 database/
    │   ├── 📄 database.py      # Configuração SQLAlchemy
    │   ├── 📄 seed_data.py     # Módulo de dados iniciais
    │   ├── 📄 manage_seed.py   # Script de gerenciamento seed
    │   └── 📁 storage/
    │       └── 📄 workout.db   # Banco SQLite
    ├── 📁 atleta/              # Módulo de atletas
    ├── 📁 categorias/          # Módulo de categorias
    ├── 📁 centro_treinamento/  # Módulo de centros
    └── 📁 contrib/             # Utilitários compartilhados
```

## 🚀 Iniciando a Aplicação

### Método Recomendado (PowerShell)
```powershell
# Iniciar em modo desenvolvimento
.\run.ps1

# Iniciar em modo produção
.\run.ps1 -Mode prod
```

### Usando Make
```bash
# Ver todos os comandos disponíveis
make help

# Iniciar aplicação
make run

# Configurar ambiente completo
make setup
```

## 📊 Banco de Dados

### Estrutura
- **SQLite** local com **aiosqlite** para operações assíncronas
- **3 tabelas principais**: `categorias`, `centro_treinamento`, `atletas`
- **Dados iniciais** inseridos automaticamente na inicialização

### Gerenciamento de Dados
```powershell
# Criar/verificar dados iniciais
.\seed.ps1 create

# Reset completo (CUIDADO!)
.\seed.ps1 reset
```

### Comandos de Banco (Make)
```bash
make db-shell      # Abrir shell SQLite
make db-tables     # Listar tabelas
make db-categorias # Ver categorias
make db-centros    # Ver centros de treinamento
make db-atletas    # Ver atletas
make db-backup     # Backup com timestamp
```

## 🔧 API Endpoints

### Documentação
- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

### Principais Endpoints
```
GET  /categoria/              # Listar categorias
POST /categoria/              # Criar categoria
GET  /categoria/{id}          # Buscar categoria por ID

GET  /centro_treinamento/     # Listar centros
POST /centro_treinamento/     # Criar centro
GET  /centro_treinamento/{id} # Buscar centro por ID

GET  /atleta/                 # Listar atletas
POST /atleta/                 # Criar atleta
GET  /atleta/{id}             # Buscar atleta por ID
```

## 📦 Dependências Principais

- **FastAPI** 0.121.2 - Framework web
- **SQLAlchemy** 2.0.44 - ORM
- **aiosqlite** 0.21.0 - Driver SQLite assíncrono
- **Pydantic** 2.12.4 - Validação de dados
- **Uvicorn** 0.38.0 - Servidor ASGI

## ⚙️ Configuração

### Variáveis de Ambiente (.env)
```env
DATABASE_URL=sqlite+aiosqlite:///./database/storage/workout.db
```

### Estrutura de Dados

#### Categoria
```json
{
  "id": 1,
  "nome": "Scale"
}
```

#### Centro de Treinamento
```json
{
  "id": 1,
  "nome": "Academia",
  "endereco": "Rua das Flores, 123",
  "proprietario": "João Silva"
}
```

#### Atleta
```json
{
  "id": 1,
  "nome": "João Atleta",
  "cpf": "12345678901",
  "idade": 25,
  "peso": 75.5,
  "altura": 1.80,
  "sexo": "M",
  "categoria_id": 1,
  "centro_treinamento_id": 1
}
```

## 🛠️ Comandos Úteis

### Desenvolvimento
```powershell
# Instalar dependências
make install

# Atualizar requirements.txt
make freeze

# Limpar arquivos temporários
make clean

# Status do projeto
make status
```

### Produção
```powershell
# Iniciar em modo produção
.\run.ps1 -Mode prod

# Backup do banco
make db-backup
```

## 🔒 Recursos de Segurança

- **Validação de duplicatas**: Previne inserção de dados duplicados
- **Tratamento de erros**: Responses HTTP apropriados (409 Conflict, 404 Not Found)
- **Validação Pydantic**: Validação automática de entrada de dados

## 📝 Logs e Monitoramento

- **Logs estruturados**: Informações de inicialização e operações
- **Hot reload**: Reinicialização automática em desenvolvimento
- **Status de saúde**: Endpoints para verificação de status

## 🎯 Features Implementadas

- ✅ CRUD completo para todas as entidades
- ✅ Relacionamentos entre tabelas (Foreign Keys)
- ✅ Validação de dados com Pydantic
- ✅ Documentação automática (OpenAPI/Swagger)
- ✅ Prevenção de duplicatas
- ✅ Sistema de dados iniciais (seed)
- ✅ Scripts de automação (PowerShell)
- ✅ Estrutura organizada e profissional

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.