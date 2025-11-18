# 🏋️‍♂️ WorkoutAPI - Sua API de Treinos Turbinada! 

> 🎯 **Projeto DIO (Digital Innovation One)**: *Desenvolvendo sua Primeira API com FastAPI, Python e Docker*
> 
> 💪 Uma API moderna, profissional e super divertida para gerenciar atletas, categorias e centros esportivos!

[![FastAPI](https://img.shields.io/badge/FastAPI-0.121.2-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.44-red?style=for-the-badge&logo=sqlalchemy)](https://www.sqlalchemy.org/)
[![Python](https://img.shields.io/badge/Python-3.14-blue?style=for-the-badge&logo=python)](https://www.python.org/)
[![SQLite](https://img.shields.io/badge/SQLite-Local-003B57?style=for-the-badge&logo=sqlite)](https://www.sqlite.org/)

---

## 🎉 Bem-vindo à WorkoutAPI Modernizada!

Olá, desenvolvedor incrível! 👋 

Esta é a **WorkoutAPI**, uma API completamente renovada e profissionalizada para o desafio da **DIO**! Aqui você encontra um projeto real, com estrutura empresarial e ferramentas modernas.

### 🌟 O que mudou e você vai AMAR?

- ✅ **API profissional** com prevenção de duplicatas (HTTP 409 Conflict)
- ✅ **Estrutura organizada** - banco de dados em diretório dedicado `storage/`
- ✅ **Scripts PowerShell avançados** - `utils.ps1` com comandos profissionais
- ✅ **Makefile completo** - mais de 20 comandos disponíveis
- ✅ **Documentação interativa** (Swagger) - teste tudo direto no navegador!
- ✅ **Sistema de seed automático** - dados iniciais criados automaticamente
- ✅ **Logs estruturados** - saiba exatamente o que está acontecendo
- ✅ **Compatível com Python 3.8+** (testado em 3.14)

---

## 🚀 Começando do Zero (Super Fácil!)

### 📋 Pré-requisitos (Só o Básico!)

```bash
✅ Python 3.8+ (de preferência 3.14)
✅ PowerShell (Windows) - já vem instalado!
✅ Git (opcional) - para clonar o projeto
```

### 🎯 Passo 1: Clone o Projeto

```bash
# Clona diretamente do GitHub da DIO
git clone https://github.com/RomarioSantos-Oficial/Desenvolvendo-sua-Primeira-API-com-FastAPI-Python-e-Docker.git

# Entre na pasta
cd Desenvolvendo-sua-Primeira-API-com-FastAPI-Python-e-Docker
```

### 🎯 Passo 2: Execute com 1 Comando Mágico! ✨

```powershell
# Windows - Execute este comando e PRONTO!
.\run.ps1

# Modo produção (otimizado)
.\run.ps1 -Mode prod

# Primeiro uso? Execute o setup completo (recomendado!)
.\utils.ps1 status  # Ver status do projeto
```

### 🎯 Passo 3: Acesse e Explore! 🎊

🚀 **A aplicação inicia em segundos!** Abra seu navegador e acesse:

- 🌐 **API Principal**: http://127.0.0.1:8000
- 📚 **Documentação Interativa**: http://127.0.0.1:8000/docs ← **COMECE AQUI!**
- 📖 **Documentação Alternativa**: http://127.0.0.1:8000/redoc
- ⚙️ **Engine Especial**: http://127.0.0.1:8000/engine

### 🎯 Passo 4: Explore os Novos Comandos! 🛠️

```powershell
# Ver todos os comandos disponíveis
.\utils.ps1 help

# Ver status completo do projeto
.\utils.ps1 status

# Limpar arquivos temporários
.\utils.ps1 clean

# Gerenciar dados iniciais
.\seed.ps1 create   # Criar dados
.\seed.ps1 reset    # Reset completo
```

---

## 🎮 Como Usar (Super Interativo!)

### 🔥 Teste Direto no Navegador!

1. **Acesse**: http://localhost:8000/docs
2. **Veja todos os endpoints** organizadinhos
3. **Clique em "Try it out"** em qualquer endpoint
4. **Preencha os dados** e clique em "Execute"
5. **Veja a mágica acontecer!** ✨

### 📊 Endpoints Disponíveis (Atualizado!)

#### 🏃‍♂️ **Atletas** (`/atleta`) - *COM RELACIONAMENTOS!*
```bash
POST /atleta/     # ➕ Criar novo atleta (com categoria e centro)
GET  /atleta/     # 📋 Listar todos os atletas (com relacionamentos)
GET  /atleta/{id} # 🔍 Buscar atleta específico
```

#### 🏷️ **Categorias** (`/categoria`) - *SISTEMA COMPLETO!*
```bash
POST /categoria/      # ➕ Criar nova categoria
GET  /categoria/      # 📋 Listar todas as categorias
GET  /categoria/{id}  # 🔍 Buscar categoria por ID
```

#### 🏢 **Centros de Treinamento** (`/centro_treinamento`) - *GESTÃO TOTAL!*
```bash
POST /centro_treinamento/      # ➕ Criar novo centro
GET  /centro_treinamento/      # 📋 Listar todos os centros
GET  /centro_treinamento/{id}  # 🔍 Buscar centro por ID
```

### 🎯 Exemplos Práticos - Passo a Passo!

#### 1️⃣ **Primeiro: Crie uma Categoria**
```json
{
  "nome": "Scale"
}
```
**✅ Resposta**: `201 Created` com ID gerado automaticamente!

#### 2️⃣ **Segundo: Crie um Centro de Treinamento**
```json
{
  "nome": "CT King",
  "endereco": "Rua das Flores, 123, Cidade - Estado",
  "proprietario": "João Silva"
}
```
**✅ Resposta**: `201 Created` com informações completas!

#### 3️⃣ **Terceiro: Crie um Atleta Completo**
```json
{
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
**✅ Resposta**: `201 Created` com todos os relacionamentos!

### 🚨 **NOVIDADE**: Prevenção de Duplicatas!

Tente criar o mesmo atleta novamente e receba:
```json
{
  "detail": "Atleta com CPF 12345678901 já cadastrado"
}
```
**🛡️ Resposta**: `409 Conflict` - Sistema inteligente!

---

## 🗄️ Banco de Dados - A Grande Mudança! 

### 🤔 Por que Mudamos de PostgreSQL para SQLite?

**Resposta simples**: Para facilitar SUA vida! 😊

#### ❌ **Antes (Complicado)**
```bash
🐳 Docker Compose necessário
🔧 PostgreSQL para instalar  
⚙️ Configurações complexas
💾 Banco externo para gerenciar
😰 Muita dor de cabeça!
```

#### ✅ **Agora (Super Fácil)**
```bash
✨ Zero configuração necessária
📁 Banco local automático
⚡ Execução instantânea
🎯 Foco no aprendizado
😎 Só diversão!
```

### 📂 Organização Profissional - NOVA ESTRUTURA!

**🔥 GRANDE MELHORIA**: Agora temos um diretório dedicado para armazenamento!

```
workoutapi/database/
├── 📄 database.py        # Configuração SQLAlchemy
├── 📄 seed_data.py       # Dados iniciais
├── 📄 manage_seed.py     # Gerenciador de seed
└── 📁 storage/           # 🆕 DIRETÓRIO EXCLUSIVO!
    └── 📄 workout.db     # Banco SQLite isolado
```

### 🎯 Por que Criamos o Diretório `storage/`?

#### ✅ **Vantagens da Nova Organização**
- 🗂️ **Separação clara**: Código vs Dados
- 🔒 **Backup simplificado**: Só copiar `storage/`
- 🧹 **Limpeza fácil**: Reset sem perder código
- 🛡️ **Gitignore inteligente**: Protege dados sensíveis
- 📋 **Padrão empresarial**: Como fazem os grandes projetos

### 🔧 Configuração Automática Aprimorada

```python
# URL otimizada com novo caminho!
DATABASE_URL = "sqlite+aiosqlite:///./database/storage/workout.db"

# ✅ Assíncrono (performance máxima!)
# ✅ Autocriação (diretórios criados automaticamente!)  
# ✅ Isolado (dados separados do código!)
# ✅ Backup-friendly (estrutura organizada!)
```

### 🎲 Sistema de Dados Iniciais (Seed)

**NOVIDADE**: Dados de exemplo criados automaticamente!

```bash
# Categorias padrão
- Scale
- Olympic Weightlifting  
- CrossFit

# Centro de treinamento padrão
- CT King (Rua Example, 123)

# Atleta de exemplo
- João Atleta (CPF: 12345678901)
```

---

## 📁 Arquitetura Profissional - ESTRUTURA ATUALIZADA!

```
🎯 WORKOUT_API/ (Projeto DIO Modernizado)
├── 📜 README.md                  # 📖 Documentação completa (este arquivo!)
├── 📜 README_UPDATED.md          # 📋 Documentação técnica
├── 🚀 run.ps1                    # ⭐ SCRIPT PRINCIPAL - Inicie aqui!
├── 🌱 seed.ps1                   # 🎲 Gerenciador de dados iniciais
├── 🛠️ utils.ps1                  # 🔧 NOVO! Utilitários PowerShell
├── ⚙️ Makefile                   # 🏗️ 20+ comandos profissionais
├── 📦 requirements.txt           # 📝 41 dependências atualizadas
├── ⚙️ alembic.ini               # 🔄 Migrações do banco
├── 🗂️ alembic/                  # 📚 Sistema de migrações
└── 🏗️ workoutapi/ (Ambiente Virtual)
    ├── 🎯 main.py               # 🚪 Portal de entrada da API
    ├── 🎯 engine.py             # 🔧 Engine auxiliar (Docker compat.)
    ├── 🎯 routers.py            # 🛣️ Configuração de rotas
    ├── 🔐 .env                  # ⚙️ Configurações do ambiente
    ├── 📁 database/             # 💾 NOVO! Sistema de banco organizado
    │   ├── 🧠 database.py       # 🔗 Configuração SQLAlchemy
    │   ├── 🎲 seed_data.py      # 📊 Dados iniciais estruturados
    │   ├── ⚙️ manage_seed.py    # 🎮 MOVIDO! Gerenciador de seed
    │   └── 📁 storage/          # 🆕 DIRETÓRIO EXCLUSIVO!
    │       └── 💾 workout.db    # 🗄️ Banco SQLite isolado
    ├── 🏃‍♂️ atleta/              # 👤 Módulo completo de atletas
    │   ├── models.py           # 🏗️ Modelo de dados
    │   ├── schemas.py          # 📋 Validação Pydantic
    │   └── controller.py       # 🎮 Lógica de negócio
    ├── 🏷️ categorias/            # 🏆 Módulo de categorias
    │   ├── models.py           # 🏗️ Modelo de dados
    │   ├── schemas.py          # 📋 Validação Pydantic
    │   └── controller.py       # 🎮 Lógica de negócio
    ├── 🏢 centro_treinamento/    # 🏋️ Módulo de centros
    │   ├── models.py           # 🏗️ Modelo de dados
    │   ├── schemas.py          # 📋 Validação Pydantic
    │   └── controller.py       # 🎮 Lógica de negócio
    ├── ⚙️ configs/              # 🔧 Configurações da aplicação
    │   ├── database.py         # 🗄️ Settings do banco
    │   └── settings.py         # ⚙️ Configurações gerais
    └── 🔧 contrib/              # 🛠️ Ferramentas auxiliares
        ├── __init__.py         # 📦 Módulo Python
        └── repository.py       # 🗂️ Padrão Repository
```

### 🔥 **PRINCIPAIS MELHORIAS**:

1. **📁 Organização Profissional**: Banco isolado em `storage/`
2. **🛠️ Scripts Avançados**: `utils.ps1` com comandos profissionais
3. **🎲 Sistema Seed**: Dados iniciais automatizados
4. **⚙️ Makefile Completo**: 20+ comandos para desenvolvimento
5. **🏗️ Estrutura Modular**: Cada módulo com models, schemas e controllers

---

## 🎮 Comandos Profissionais - GUIA COMPLETO!

### 🚀 **Comandos Principais** (Execute estes primeiro!)

```powershell
# 🎯 COMANDO MÁGICO - Inicia tudo automaticamente!
.\run.ps1

# 🔍 Ver status completo do projeto
.\utils.ps1 status

# 📚 Ver TODOS os comandos disponíveis
.\utils.ps1 help
```

### 🛠️ **Comandos Utils.ps1** (NOVO! Super Úteis!)

```powershell
# 📊 Status detalhado do projeto
.\utils.ps1 status

# 🧹 Limpar arquivos temporários e cache
.\utils.ps1 clean

# 📦 Instalar todas as dependências
.\utils.ps1 install

# 📋 Atualizar requirements.txt com pacotes atuais
.\utils.ps1 freeze

# ❓ Ver ajuda detalhada com exemplos
.\utils.ps1 help
```

### 🎲 **Comandos Seed** (Gerenciar Dados Iniciais!)

```powershell
# ✨ Criar dados iniciais (categorias, centros, atletas)
.\seed.ps1 create

# 🔄 Reset completo do banco (CUIDADO!)
.\seed.ps1 reset

# 📊 Ver status dos dados
.\seed.ps1 status
```

### ⚙️ **Comandos Make** (20+ Comandos Profissionais!)

#### 📚 **Principais**
```bash
make help          # 📖 Ver TODOS os comandos disponíveis
make run           # 🚀 Servidor produção
make dev           # 🔧 Servidor desenvolvimento (hot reload)
make setup         # ⚙️ Configuração completa do ambiente
make install       # 📦 Instalar dependências
```

#### 🗄️ **Banco de Dados** (SQLite Profissional!)
```bash
make db-shell      # 💻 Abrir shell interativo do SQLite
make db-tables     # 📋 Listar todas as tabelas
make db-categorias # 🏷️ Ver todas as categorias
make db-centros    # 🏢 Ver centros de treinamento
make db-atletas    # 🏃‍♂️ Ver todos os atletas
make db-backup     # 💾 Backup com timestamp automático
```

#### 🛠️ **Manutenção**
```bash
make clean         # 🧹 Limpar arquivos temporários
make status        # 📊 Status completo do projeto
make freeze        # 📋 Atualizar requirements.txt
make seed-create   # 🌱 Criar dados iniciais
make seed-reset    # 🔄 Reset completo (CUIDADO!)
```

### 🔧 **Comandos de Desenvolvimento Avançado**

```powershell
# 🔍 Verificar ambiente Python
cd workoutapi; .\Scripts\python.exe --version

# 📦 Instalar nova dependência
cd workoutapi; .\Scripts\pip.exe install nova-dependencia

# 🧪 Testar importações
cd workoutapi; .\Scripts\python.exe -c "import fastapi; print('✅ FastAPI OK!')"

# 🚀 Executar com configurações específicas
.\run.ps1 -Mode prod -Port 8080
```

### 🆘 **Comandos de Emergência** (Se algo der errado!)

```powershell
# 🔄 Reset completo do ambiente
.\utils.ps1 clean
.\utils.ps1 install

# 🗄️ Recriar banco do zero
.\seed.ps1 reset
.\seed.ps1 create

# 🧹 Limpeza profunda
Remove-Item -Recurse -Force workoutapi\__pycache__ -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force workoutapi\**\__pycache__ -ErrorAction SilentlyContinue

# 🔍 Verificar integridade
.\utils.ps1 status
```

---

## 🎯 Tutorial Passo a Passo (Para Iniciantes!)

### 🟢 **Nível Iniciante**: Apenas Execute!

1. **📥 Clone o projeto**
2. **🚀 Execute**: `.\run.ps1`
3. **🌐 Abra**: http://localhost:8000/docs
4. **🎉 Divirta-se** testando os endpoints!

### 🟡 **Nível Intermediário**: Explore os Dados!

1. **➕ Crie uma categoria**: `POST /categoria/`
   ```json
   {"nome": "Crossfit"}
   ```

2. **🏢 Crie um centro**: `POST /centro_treinamento/`
   ```json
   {
     "nome": "Academia Central",
     "endereco": "Rua das Flores, 123",
     "proprietario": "João Silva"
   }
   ```

3. **🏃‍♂️ Crie um atleta**: `POST /atleta/`
   ```json
   {
     "nome": "Maria Santos", 
     "cpf": "98765432100",
     "idade": 28,
     "peso": 65.0,
     "altura": 1.70,
     "sexo": "F"
   }
   ```

### 🔴 **Nível Avançado**: Customize Tudo!

1. **🔧 Modifique os models** em `workoutapi/*/models.py`
2. **🎨 Adicione novos endpoints** nos controllers
3. **🗄️ Crie migrações** com Alembic
4. **🚀 Deploy em produção**

---

## 🤝 Conecte-se com a Comunidade DIO!

### 🎓 **Este é um Projeto DIO!**

- 🌟 **Curso**: "Desenvolvendo sua Primeira API com FastAPI, Python e Docker"
- 🎯 **Objetivo**: Aprender FastAPI de forma prática e divertida
- 💪 **Desafio**: Construir uma API completa do zero
- 🏆 **Resultado**: Você está vendo agora!

### 📚 **Continue Aprendendo**

- 🔗 **Site da DIO**: https://dio.me
- 📱 **Discord DIO**: Conecte-se com outros devs
- 🐙 **GitHub**: Compartilhe seus projetos
- 💼 **LinkedIn**: Mostre suas conquistas

### 🤝 **Contribua com o Projeto**

```bash
# 1️⃣ Fork o projeto no GitHub
# 2️⃣ Crie sua branch
git checkout -b feature/minha-feature-incrivel

# 3️⃣ Faça suas modificações incríveis
# 4️⃣ Commit suas mudanças  
git commit -am "✨ Adiciona feature incrível"

# 5️⃣ Push para o GitHub
git push origin feature/minha-feature-incrivel

# 6️⃣ Abra um Pull Request
# 7️⃣ Comemore! 🎉
```

---

## 🔥 Tecnologias Utilizadas (Stack Moderna!)

### 🚀 **Backend Poderoso**
- **FastAPI** 🌟 - Framework web mais rápido do Python
- **SQLAlchemy** 🗄️ - ORM mais popular do Python  
- **Pydantic** ✅ - Validação de dados automática
- **Uvicorn** ⚡ - Servidor ASGI super rápido

### 🗄️ **Banco de Dados Inteligente**
- **SQLite** 💎 - Banco local, rápido e confiável
- **Aiosqlite** 🔄 - Suporte assíncrono para SQLite
- **Alembic** 🔄 - Sistema de migrações automáticas

### 🔧 **Ferramentas de Desenvolvimento Profissionais**
- **Python 3.14** 🐍 - Linguagem mais moderna (compatível 3.8+)
- **PowerShell Scripts** 💻 - Automação avançada (`run.ps1`, `seed.ps1`, `utils.ps1`)
- **Makefile** ⚙️ - 20+ comandos profissionais
- **Git** 📝 - Controle de versão com .gitignore inteligente
- **VS Code** 🔧 - Ambiente de desenvolvimento recomendado

---

## 🎯 Por que Você Vai AMAR Este Projeto?

### ✨ **Simplicidade Profissional**
- **1 comando** (`.\run.ps1`) e tudo funciona
- **Setup automático** - ambiente e dados criados automaticamente
- **Scripts inteligentes** - `utils.ps1` com comandos profissionais
- **Documentação interativa** - Swagger UI automático

### 🚀 **Performance e Qualidade de Elite**
- **Assíncrono por padrão** - SQLAlchemy + aiosqlite
- **Prevenção de duplicatas** - HTTP 409 Conflict responses
- **Validação automática** - Pydantic 2.12.4
- **Logs estruturados** - Acompanhe tudo que acontece
- **Relacionamentos inteligentes** - Foreign Keys automáticas

### 🎓 **Aprendizado Profissional Garantido**
- **Código limpo** seguindo padrões da indústria
- **Estrutura modular** - models, schemas, controllers separados
- **Comentários explicativos** em português brasileiro
- **Padrões empresariais** - Repository Pattern, dependency injection
- **Organização profissional** - diretórios dedicados para cada responsabilidade

### 🎉 **Experiência de Desenvolvedor Incrível**
- **Interface moderna** - Swagger UI responsivo
- **Testes interativos** - Execute APIs direto no navegador
- **Feedback imediato** - Respostas claras e informativas
- **Scripts auxiliares** - Automação total com PowerShell
- **Comandos intuitivos** - Make e utils.ps1 com help integrado

---

## 🏆 Parabéns, Você Conseguiu!

Se chegou até aqui, você já é um **desenvolvedor FastAPI**! 🎉

### 🎯 **Próximos Passos Sugeridos:**

1. **🚀 Faça deploy** na nuvem (Heroku, Railway, Vercel)
2. **🔐 Adicione autenticação** JWT
3. **📊 Implemente relatórios** e dashboards
4. **🤖 Integre com IA** para recomendações
5. **📱 Crie um front-end** React/Vue/Angular

### 💝 **Um Presente para Você**

Este projeto foi feito com muito ❤️ para que você tenha a melhor experiência possível aprendendo FastAPI. 

> *"O conhecimento compartilhado é o único que se multiplica!"* 🌟

---

**🚀 Desenvolvido com muito ❤️ para a comunidade DIO**

**⭐ Se este projeto te ajudou, deixe uma estrela no GitHub!**

**🤝 Conecte-se, compartilhe e continue aprendendo!**
├── run.ps1                    # Script PowerShell
├── docker-compose.yml         # Docker (opcional)
└── README.md                  # Esta documentação
```

## 🛠️ Comandos Make Disponíveis

### 📚 Principais
- `make run` - Servidor produção
- `make dev` - Servidor desenvolvimento  
- `make setup` - Configuração completa
- `make install` - Instalar dependências

### 🗄️ Banco de dados
- `make db-shell` - Shell SQLite
- `make db-tables` - Listar tabelas
- `make db-users` - Ver usuários
- `make db-workouts` - Ver workouts
- `make db-backup` - Backup

### 🛠️ Manutenção
- `make clean` - Limpar arquivos temporários
- `make status` - Status do projeto
- `make freeze` - Atualizar requirements.txt
- `make help` - Ver todos os comandos

## 🔧 Desenvolvimento

### Adicionar nova dependência

```bash
# Instalar no ambiente
cd workoutapi
.\Scripts\pip.exe install nova-dependencia

# Atualizar requirements.txt
make freeze
```

### Limpar ambiente

```bash
# Limpar arquivos temporários
make clean

# Recriar ambiente virtual (CUIDADO!)
make reset-env
```

## 📊 Status do Projeto

```bash
make status
```

## 🐳 Docker (Opcional)

```bash
# Subir containers
make docker-up

# Parar containers
make docker-down

# Ver logs
make docker-logs
```

## 📝 Dependências Principais

- **FastAPI** - Framework web moderno
- **Uvicorn** - Servidor ASGI
- **SQLAlchemy** - ORM para banco de dados
- **Pydantic** - Validação de dados
- **python-dotenv** - Gerenciamento de variáveis de ambiente

## 🤝 Contribuição

1. Fork do projeto
2. Criar branch para feature (`git checkout -b feature/nova-feature`)
3. Commit das mudanças (`git commit -am 'Add nova feature'`)
4. Push para branch (`git push origin feature/nova-feature`)
5. Criar Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Documentação feita pelo Copilot


**Desenvolvido com ❤️ usando FastAPI e SQLite**#   D e s e n v o l v e n d o - s u a - P r i m e i r a - A P I - c o m - F a s t A P I - P y t h o n - e - D o c k e r 
 
 