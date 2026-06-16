<div align="center">

# 🏋️ Fhit

**Acompanhamento integrado de saúde e condicionamento físico**

Treinos, hábitos, peso e IMC em uma única plataforma, com dashboards de evolução.

</div>

---

## 📋 Sobre o projeto

O **Fhit** é um sistema web que centraliza o acompanhamento de rotinas fitness,
resolvendo a fragmentação de ferramentas para quem treina. Em uma única
plataforma o usuário registra **sessões de treino**, acompanha um **checklist de
hábitos diários** com sequência (streak), registra a **evolução do peso** com
**cálculo automático de IMC** e visualiza tudo em **dashboards semanal e mensal**.

Projeto Tecnológico — ULBRA.

## 🚀 Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Framework | **Next.js 16** (App Router) + React 19 |
| Linguagem | **TypeScript** |
| Estilização | **Tailwind CSS 4** |
| Banco de dados | **PostgreSQL** (NeonDB em produção) |
| ORM | **Prisma 6** |
| Autenticação | **NextAuth.js** (credenciais + JWT) |
| Validação | **Zod** (cliente e servidor) |
| Formulários | **React Hook Form** |
| Gráficos | **Recharts** |
| Hospedagem | **Vercel** (deploy contínuo via GitHub) |

## 📦 Pré-requisitos

- **Node.js** 18.18+ (recomendado 20+)
- **Yarn** 1.x (o projeto usa Yarn como gerenciador)
- Uma instância **PostgreSQL** (local ou um banco gratuito no [Neon](https://neon.tech))

## ⚙️ Instalação e execução (ambiente local)

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd fhit-ulbra
```

### 2. Instalar as dependências

```bash
yarn install
```

> O script `postinstall` gera o Prisma Client automaticamente.

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz a partir do modelo:

```bash
cp .env.example .env
```

Preencha os valores:

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | String de conexão do PostgreSQL |
| `NEXTAUTH_SECRET` | Chave para assinar a sessão — gere com `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` em desenvolvimento |

### 4. Aplicar as migrations no banco

```bash
yarn db:deploy
```

> Em desenvolvimento, use `yarn db:migrate` para criar/aplicar novas migrations.

### 5. Rodar o servidor de desenvolvimento

```bash
yarn dev
```

Acesse **[http://localhost:3000](http://localhost:3000)**. Crie uma conta na tela
de cadastro e comece a usar.

## 🏗️ Build de produção

```bash
yarn build   # gera o Prisma Client e compila a aplicação
yarn start   # inicia o servidor de produção
```

## 📜 Scripts disponíveis

| Script | Ação |
|--------|------|
| `yarn dev` | Servidor de desenvolvimento |
| `yarn build` | Build de produção (Prisma generate + Next build) |
| `yarn start` | Servidor de produção |
| `yarn lint` | Análise estática (ESLint) |
| `yarn db:migrate` | Cria e aplica migrations (dev) |
| `yarn db:deploy` | Aplica migrations (produção) |
| `yarn db:studio` | Abre o Prisma Studio |

## 🗂️ Estrutura do projeto

O projeto segue a arquitetura **Feature-Sliced Design (FSD)**:

```
src/
├── app/                  # Rotas (App Router)
│   ├── (auth)/           # Login e cadastro
│   ├── (app)/            # Área autenticada (dashboard, treinos, hábitos, peso, perfil)
│   └── api/              # Rotas de API (NextAuth)
├── entities/             # Entidades de domínio (model, schema Zod, repository)
│   ├── user/
│   ├── workout-session/
│   ├── workout-template/
│   ├── habit/
│   ├── habit-completion/
│   └── weight-log/
├── features/             # Funcionalidades (server actions + UI)
│   ├── auth/
│   ├── workout/
│   ├── workout-template/
│   ├── habit/
│   ├── weight/
│   ├── profile/
│   └── dashboard/
├── widgets/              # Composições de UI (app-shell)
├── shared/               # Código compartilhado (ui, utils, config, types)
└── proxy.ts              # Proteção de rotas (middleware do Next 16)
```

<div align="center">
Desenvolvido como Projeto Tecnológico — ULBRA
</div>
