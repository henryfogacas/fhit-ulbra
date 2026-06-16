# Projeto — Fhit

## Escopo (MVP)

Conforme retorno recebido na etapa anterior, o escopo deste projeto foi delimitado para o que será entregue na **primeira versão (MVP)** do sistema. Os módulos contemplados são:

- Autenticação de usuários;
- Registro de treinos;
- Controle de hábitos diários;
- Acompanhamento de peso com cálculo de IMC;
- Dashboards consolidados.

> Os módulos de **metas** e **medidas corporais detalhadas**, presentes na proposta original, ficam previstos para versões futuras e não foram modelados aqui para garantir coerência entre o que será projetado e o que será efetivamente implementado.

---

## 1. Diagrama de Caso de Uso

### Estrutura do diagrama

- **Ator:** Usuário.
- **Casos de uso conectados ao ator:** Cadastrar-se no sistema, Autenticar-se no sistema, Encerrar sessão, Registrar sessão de treino, Visualizar histórico de treinos, Editar ou excluir sessão de treino, Criar modelo de treino reutilizável, Cadastrar hábito diário, Marcar hábito como concluído, Visualizar sequência de hábitos, Editar ou excluir hábito, Registrar peso corporal, Cadastrar altura e calcular IMC, Visualizar evolução de peso e IMC, Visualizar dashboard semanal, Visualizar dashboard mensal.

### Especificação dos Casos de Uso

#### UC01 — Cadastrar-se no sistema

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário acessa a página de cadastro, informa nome, e-mail e senha. O sistema valida os dados (e-mail único, senha com mínimo de 8 caracteres), criptografa a senha com hashing seguro e cria o registro do usuário no banco. Após o cadastro, o usuário é redirecionado para a tela de login. |

#### UC02 — Autenticar-se no sistema

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário informa e-mail e senha na tela de login. O sistema valida as credenciais e, em caso de sucesso, cria uma sessão autenticada e redireciona o usuário para o dashboard. Em caso de falha, exibe mensagem de erro sem revelar qual campo está incorreto. |

#### UC03 — Encerrar sessão

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário autenticado clica em sair. O sistema invalida a sessão atual e redireciona para a tela de login. |

#### UC04 — Registrar sessão de treino

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário cria uma nova sessão de treino informando data, grupos musculares trabalhados e a lista de exercícios com séries, repetições e carga utilizada. O sistema valida os dados e armazena o registro vinculado ao usuário autenticado. |

#### UC05 — Visualizar histórico de treinos

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário acessa o histórico de treinos. O sistema retorna todas as sessões registradas pelo usuário, ordenadas da mais recente para a mais antiga, com filtros por período e por grupo muscular. |

#### UC06 — Editar ou excluir sessão de treino

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário seleciona uma sessão de treino do histórico. O sistema permite alterar os dados ou excluir o registro, sempre exigindo confirmação antes de operações destrutivas. |

#### UC07 — Criar modelo de treino reutilizável

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário cadastra um modelo de treino com nome, grupos musculares e lista de exercícios padrão. Esse modelo pode ser usado para preencher automaticamente uma nova sessão de treino, agilizando o registro do dia a dia. |

#### UC08 — Cadastrar hábito diário

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário cadastra um hábito recorrente informando nome, descrição opcional e frequência (todos os dias ou dias específicos da semana). O sistema valida e armazena o hábito vinculado ao usuário. |

#### UC09 — Marcar hábito como concluído

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário acessa o checklist do dia e marca os hábitos que foram concluídos. O sistema registra a conclusão com data e atualiza automaticamente a sequência de dias consecutivos caso todos os hábitos do dia tenham sido concluídos. |

#### UC10 — Visualizar sequência de hábitos

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O sistema exibe ao usuário o número atual de dias consecutivos com hábitos concluídos e a maior sequência já alcançada, servindo como elemento de motivação e engajamento. |

#### UC11 — Editar ou excluir hábito

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário seleciona um hábito cadastrado e pode alterar seus dados ou excluí-lo. Histórico de conclusões anteriores é preservado por questão de auditoria, mesmo após exclusão do hábito. |

#### UC12 — Registrar peso corporal

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário registra seu peso atual informando o valor em quilogramas e a data do registro. O sistema armazena o histórico para que o usuário acompanhe a evolução ao longo do tempo. |

#### UC13 — Cadastrar altura e calcular IMC

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O usuário informa sua altura no cadastro inicial ou no perfil. O sistema utiliza essa informação combinada ao peso mais recente para calcular automaticamente o Índice de Massa Corporal e classificá-lo (abaixo do peso, normal, sobrepeso ou obesidade). |

#### UC14 — Visualizar evolução de peso e IMC

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O sistema exibe um gráfico de linha com a evolução do peso ao longo do tempo, juntamente com o IMC atual e sua classificação. O usuário consegue identificar tendências de ganho ou perda de peso com clareza visual. |

#### UC15 — Visualizar dashboard semanal

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O sistema exibe um painel com o resumo da semana: número de sessões de treino realizadas, taxa de conclusão dos hábitos, sequência atual e variação de peso na semana. Esse painel é a tela principal do sistema após o login. |

#### UC16 — Visualizar dashboard mensal

| Campo | Conteúdo |
|-------|----------|
| **Ator** | Usuário |
| **Descrição** | O sistema exibe uma visão consolidada do mês com gráficos de frequência de treinos, taxa de conclusão de hábitos por semana e curva de evolução do peso, permitindo ao usuário enxergar a evolução em uma janela maior. |

---

## 2. Diagrama ER

### Estrutura das entidades

| Entidade | Atributos |
|----------|-----------|
| **Usuario** | `id` (PK), `nome`, `email` (único), `senha_hash`, `altura_cm`, `data_cadastro` |
| **SessaoTreino** | `id` (PK), `id_usuario` (FK), `data`, `grupos_musculares`, `observacoes`, `criado_em` |
| **Exercicio** | `id` (PK), `id_sessao_treino` (FK), `nome`, `series`, `repeticoes`, `carga_kg`, `ordem` |
| **ModeloTreino** | `id` (PK), `id_usuario` (FK), `nome`, `grupos_musculares`, `criado_em` |
| **ExercicioModelo** | `id` (PK), `id_modelo_treino` (FK), `nome`, `series`, `repeticoes`, `ordem` |
| **Habito** | `id` (PK), `id_usuario` (FK), `nome`, `descricao`, `frequencia` (dias da semana), `ativo`, `criado_em` |
| **ConclusaoHabito** | `id` (PK), `id_habito` (FK), `data`, `concluido`, `registrado_em` |
| **RegistroPeso** | `id` (PK), `id_usuario` (FK), `peso_kg`, `data`, `criado_em` |

### Relacionamentos

- **Usuario** 1 : N **SessaoTreino** — um usuário possui várias sessões de treino;
- **SessaoTreino** 1 : N **Exercicio** — uma sessão contém vários exercícios;
- **Usuario** 1 : N **ModeloTreino** — um usuário pode criar vários modelos;
- **ModeloTreino** 1 : N **ExercicioModelo** — um modelo contém vários exercícios padrão;
- **Usuario** 1 : N **Habito** — um usuário possui vários hábitos cadastrados;
- **Habito** 1 : N **ConclusaoHabito** — um hábito gera registros de conclusão por dia;
- **Usuario** 1 : N **RegistroPeso** — um usuário possui vários registros de peso ao longo do tempo.

---

## 3. Ferramentas previstas para o desenvolvimento do projeto

| Ferramenta / Tecnologia | Finalidade |
|-------------------------|------------|
| **Next.js** | Framework React utilizado tanto no frontend quanto no backend através de Server Components, Server Actions e API Routes. |
| **TypeScript** | Linguagem que adiciona tipagem estática ao JavaScript, reduzindo erros em tempo de desenvolvimento e melhorando a manutenibilidade do código. |
| **PostgreSQL** | Banco de dados relacional utilizado para persistência de todas as entidades do sistema. |
| **Prisma ORM** | Camada de abstração entre a aplicação e o banco de dados PostgreSQL. Fornece tipagem automática a partir do schema, facilita migrações e elimina queries SQL escritas manualmente. |
| **NextAuth.js** | Biblioteca de autenticação para Next.js. Gerencia sessões, hashing de senhas e proteção de rotas autenticadas via middleware. |
| **Zod** | Biblioteca de validação de dados utilizada em formulários e Server Actions, garantindo integridade tanto no cliente quanto no servidor. |
| **React Hook Form** | Biblioteca para gerenciamento de formulários no React. Integrada ao Zod via `zodResolver` para validação automática. |
| **Tailwind CSS** | Framework CSS utilitário para estilização rápida e consistente. |
| **Recharts** | Biblioteca de gráficos baseada em React, utilizada para renderizar os gráficos de evolução de peso e dos dashboards semanal e mensal. |
| **NeonDB** | Serviço de hospedagem do banco de dados PostgreSQL em produção, com escalabilidade automática e plano gratuito adequado ao escopo do projeto. |
| **Vercel** | Plataforma de hospedagem da aplicação Next.js, com deploy contínuo a partir do repositório no GitHub e otimizações nativas para o framework. |
| **GitHub** | Plataforma de versionamento de código utilizada como repositório principal e gatilho do deploy contínuo na Vercel. |
| **Visual Studio Code** | Editor de código utilizado durante o desenvolvimento, com extensões para TypeScript, Prisma e Tailwind CSS. |
| **draw.io** | Ferramenta utilizada para construção dos diagramas apresentados neste documento. |
