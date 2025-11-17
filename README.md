# 🏋️‍♂️ WorkoutAPI - Sua API de Treinos Turbinada! 

> 🎯 **Projeto DIO (Digital Innovation One)**: *Desenvolvendo sua Primeira API com FastAPI, Python e Docker*
> 
> 💪 Uma API moderna e interativa para gerenciar atletas, treinos e centros esportivos!

---

## 🎉 Bem-vindo à WorkoutAPI!

Olá, futuro desenvolvedor! 👋 

Essa é a **WorkoutAPI**, uma API super intuitiva criada especialmente para o desafio da **DIO**! Aqui você vai aprender a construir, configurar e usar uma API moderna com **FastAPI** e **SQLite**.

### 🌟 O que você vai encontrar aqui?

- ✅ **API completamente funcional** para gerenciar atletas, categorias e centros de treinamento
- ✅ **Documentação interativa** (Swagger) - teste tudo direto no navegador!
- ✅ **Banco de dados simplificado** (SQLite) - sem complicação!
- ✅ **Scripts automatizados** - execute tudo com 1 comando!
- ✅ **100% compatível** com Python 3.14

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

# Ou se quiser modo produção
.\run.ps1 -Mode prod
```

### 🎯 Passo 3: Acesse e Divirta-se! 🎊

Abra seu navegador e acesse:

- 🌐 **API Principal**: http://localhost:8000
- 📚 **Documentação Interativa**: http://localhost:8000/docs ← **COMECE AQUI!**
- 📖 **Documentação Alternativa**: http://localhost:8000/redoc
- ⚙️ **Engine Especial**: http://localhost:8000/engine

---

## 🎮 Como Usar (Super Interativo!)

### 🔥 Teste Direto no Navegador!

1. **Acesse**: http://localhost:8000/docs
2. **Veja todos os endpoints** organizadinhos
3. **Clique em "Try it out"** em qualquer endpoint
4. **Preencha os dados** e clique em "Execute"
5. **Veja a mágica acontecer!** ✨

### 📊 Endpoints Disponíveis

#### 🏃‍♂️ **Atletas** (`/atleta`)
```bash
POST /atleta/     # ➕ Criar novo atleta
GET  /atleta/     # 📋 Listar todos os atletas
```

#### 🏷️ **Categorias** (`/categoria`) 
```bash
POST /categoria/      # ➕ Criar nova categoria
GET  /categoria/      # 📋 Listar todas as categorias
GET  /categoria/{id}  # 🔍 Buscar categoria por ID
```

#### 🏢 **Centros de Treinamento** (`/centro_treinamento`)
```bash
POST /centro_treinamento/      # ➕ Criar novo centro
GET  /centro_treinamento/      # 📋 Listar todos os centros
GET  /centro_treinamento/{id}  # 🔍 Buscar centro por ID
```

### 🎯 Exemplo Prático - Criando um Atleta

```json
{
  "nome": "João Silva",
  "cpf": "12345678900", 
  "idade": 25,
  "peso": 75.5,
  "altura": 1.80,
  "sexo": "M"
}
```

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

### 📂 Organização Inteligente

Colocamos o banco na pasta `database/` para:
- 🧹 **Manter organizado**: Cada coisa no seu lugar
- 🔒 **Facilitar backup**: Só copiar a pasta `database/`
- 🛡️ **Proteger dados**: `.gitignore` configurado
- 📋 **Padrão profissional**: Como fazem as grandes empresas

**Localização**: `workoutapi/database/workout.db`

### 🔧 Configuração Automática

```python
# URL mágica que funciona sozinha!
DATABASE_URL = "sqlite+aiosqlite:///./database/workout.db"

# ✅ Assíncrono (super rápido!)
# ✅ Autocriação (sem complicação!)  
# ✅ Local (sem internet necessária!)
```

---

## 📁 Arquitetura do Projeto (Descomplicada!)

```
🎯 WorkoutAPI/ (Projeto DIO)
├── 📜 README.md              # Este arquivo incrível!
├── 🚀 run.ps1                # ⭐ SCRIPT MÁGICO - Execute aqui!
├── 📦 requirements.txt        # Lista de superpoderes Python
├── ⚙️ alembic.ini            # Migrações do banco
├── 🗂️ alembic/               # Sistema de migrações
├── 🏗️ workoutapi/            # 🔥 Coração da aplicação
│   ├── 🎯 main.py            # Portal de entrada da API
│   ├── 🔐 .env               # Configurações secretas
│   ├── 🗄️ database/          # 💎 Casa do banco de dados
│   │   ├── 🧠 database.py    # Cérebro do SQLAlchemy
│   │   └── 💾 workout.db     # Banco SQLite (criado automaticamente)
│   ├── 🏃‍♂️ atleta/           # Módulo dos atletas
│   ├── 🏷️ categorias/         # Módulo das categorias  
│   ├── 🏢 centro_treinamento/ # Módulo dos centros
│   ├── ⚙️ configs/           # Configurações da app
│   └── 🔧 contrib/           # Ferramentas auxiliares
```

---

## 🎮 Comandos Rápidos (Cheat Sheet!)

### 🚀 **Super Comando** (Recomendado!)
```powershell
.\run.ps1  # ✨ Magia pura - faz tudo sozinho!
```

### 🔧 **Comandos Avançados** (Para quem quer mais!)
```bash
# 🏗️ Comandos do Make (se você tiver)
make run           # Servidor produção
make dev           # Servidor desenvolvimento
make help          # Ver todos os comandos

# 🗄️ Comandos do Banco (SQLite)
make db-shell      # Entrar no banco
make db-backup     # Fazer backup
make status        # Ver status do projeto
```

### 🐛 **Comandos de Emergência** (Se algo der errado)
```powershell
# 🔄 Resetar tudo
cd workoutapi
.\Scripts\pip.exe install -r ..\requirements.txt

# 🧹 Limpar cache
Remove-Item -Recurse -Force __pycache__

# 🔍 Verificar se tá funcionando
.\Scripts\python.exe -c "import fastapi; print('✅ FastAPI OK!')"
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

### 🔧 **Ferramentas de Desenvolvimento**
- **Python 3.14** 🐍 - Linguagem mais moderna
- **PowerShell** 💻 - Scripts de automação
- **Git** 📝 - Controle de versão

---

## 🎯 Por que Você Vai AMAR Este Projeto?

### ✨ **Simplicidade Extrema**
- **1 comando** e tudo funciona
- **Zero configuração** necessária
- **Documentação interativa** automática

### 🚀 **Performance de Elite**
- **Assíncrono por padrão**
- **Validação automática** de dados  
- **Documentação gerada** automaticamente

### 🎓 **Aprendizado Garantido**
- **Código limpo** e bem organizado
- **Comentários explicativos** em português
- **Padrões profissionais** aplicados

### 🎉 **Diversão Garantida**
- **Interface moderna** e intuitiva
- **Testes interativos** no navegador
- **Resultados imediatos**

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


**Desenvolvido com ❤️ usando FastAPI e SQLite**#   D e s e n v o l v e n d o - s u a - P r i m e i r a - A P I - c o m - F a s t A P I - P y t h o n - e - D o c k e r 
 
 