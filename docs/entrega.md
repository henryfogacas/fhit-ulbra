# Documento de Entrega — Fhit

**Projeto Tecnológico — ULBRA**
**Sistema:** Fhit — Acompanhamento de saúde e condicionamento físico

---

## 1. Acesso ao sistema

| Item | Link |
|------|------|
| 🌐 Sistema (link público) | `https://<seu-deploy>.vercel.app` |
| 💻 Repositório (código-fonte) | `https://github.com/<usuario>/fhit-ulbra` |

> As instruções de execução/instalação estão no arquivo [`README.md`](../README.md).

Para avaliar, basta acessar o link público e **criar uma conta** na tela de
cadastro — o sistema cria um ambiente isolado para cada usuário.

---

## 2. Escopo entregue

Conforme definido no documento de **Projeto** (`projeto.md`), o escopo foi
delimitado para o **MVP**, composto pelos módulos: autenticação, registro de
treinos, controle de hábitos diários, acompanhamento de peso com cálculo de IMC
e dashboards consolidados.

Os módulos de **metas** e **medidas corporais detalhadas**, presentes na proposta
original, foram **previstos para versões futuras** já na etapa de Projeto, para
garantir coerência entre o que foi projetado e o que foi implementado.

---

## 3. Status das funcionalidades (Requisitos Funcionais)

| # | Funcionalidade | Status | Observação |
|---|----------------|--------|------------|
| RF01 | Cadastro de usuário (nome, e-mail, senha) | ✅ Implementada | Senha com hash bcrypt; e-mail único |
| RF02 | Login com sessão autenticada persistente | ✅ Implementada | NextAuth (JWT, 30 dias) |
| RF03 | Registrar sessão de treino (data, grupos, exercícios, séries, reps, carga) | ✅ Implementada | |
| RF04 | Histórico completo de treinos | ✅ Implementada | Ordenado do mais recente, com filtros |
| RF05 | Modelos de treino reutilizáveis | ✅ Implementada | Pré-preenche nova sessão |
| RF06 | Cadastro/gestão de checklist de hábitos diários | ✅ Implementada | Frequência por dia da semana |
| RF07 | Registro diário de hábitos concluídos/ignorados | ✅ Implementada | Conclusão por data |
| RF08 | Sequência de dias consecutivos (streak) | ✅ Implementada | Sequência atual e recorde |
| RF09 | Cadastro de metas pessoais | ❌ Não implementada | Fora do escopo do MVP (previsto no Projeto para versão futura) |
| RF10 | Progresso visual das metas | ❌ Não implementada | Depende de RF09; fora do escopo do MVP |
| RF11 | Registro periódico de peso corporal | ✅ Implementada | Com histórico |
| RF12 | Medidas corporais (cintura, quadril, peito, braço, coxa) | ❌ Não implementada | Fora do escopo do MVP (previsto no Projeto para versão futura) |
| RF13 | Cálculo automático de IMC com classificação | ✅ Implementada | A partir de peso + altura |
| RF14 | Dashboard semanal | ✅ Implementada | Tela principal pós-login |
| RF15 | Dashboard mensal com gráficos | ✅ Implementada | Evolução de peso, treinos e hábitos |
| RF16 | Feedback visual em ações de formulário | ✅ Implementada | Mensagens de sucesso/erro (toast) |
| RF17 | Editar/excluir registros de treino, hábitos e metas | 🟡 Parcialmente implementada | Treinos e hábitos: completo (com confirmação). Metas: não fazem parte do MVP |
| RF18 | Proteção de rotas autenticadas | ✅ Implementada | Redireciona não logados para o login |
| RF19 | Isolamento de dados por usuário | ✅ Implementada | Toda consulta filtra pelo usuário autenticado |
| RF20 | Estados de carregamento | ✅ Implementada | Indicadores de loading e estados vazios |

**Resumo:** 17 implementadas · 1 parcialmente implementada · 3 não implementadas
(as não implementadas estavam **fora do escopo do MVP** já definido na etapa de Projeto).

---

## 4. Casos de uso (Projeto) — todos contemplados

| Código | Caso de uso | Status |
|--------|-------------|--------|
| UC01 | Cadastrar-se no sistema | ✅ |
| UC02 | Autenticar-se no sistema | ✅ |
| UC03 | Encerrar sessão | ✅ |
| UC04 | Registrar sessão de treino | ✅ |
| UC05 | Visualizar histórico de treinos | ✅ |
| UC06 | Editar ou excluir sessão de treino | ✅ |
| UC07 | Criar modelo de treino reutilizável | ✅ |
| UC08 | Cadastrar hábito diário | ✅ |
| UC09 | Marcar hábito como concluído | ✅ |
| UC10 | Visualizar sequência de hábitos | ✅ |
| UC11 | Editar ou excluir hábito | ✅ |
| UC12 | Registrar peso corporal | ✅ |
| UC13 | Cadastrar altura e calcular IMC | ✅ |
| UC14 | Visualizar evolução de peso e IMC | ✅ |
| UC15 | Visualizar dashboard semanal | ✅ |
| UC16 | Visualizar dashboard mensal | ✅ |

---

## 5. Requisitos Não Funcionais

| # | Requisito | Atendido |
|---|-----------|----------|
| RNF01 | Next.js 16 (App Router) + TypeScript | ✅ |
| RNF02 | PostgreSQL via Prisma ORM | ✅ |
| RNF03 | Autenticação com NextAuth.js | ✅ |
| RNF04 | Validação com Zod (cliente e servidor) | ✅ |
| RNF05 | Responsivo, mobile first | ✅ |
| RNF06 | Identidade visual moderna e consistente (Tailwind) | ✅ |
| RNF07 | Compatível com navegadores modernos | ✅ |
| RNF08 | Senhas com hashing seguro (bcrypt) | ✅ |
| RNF09 | Hospedagem na Vercel com deploy contínuo | ✅ |
| RNF10 | Banco em produção no NeonDB | ✅ |
| RNF11 | Tratamento de erros sem expor detalhes técnicos | ✅ |
| RNF12 | Estrutura de pastas padronizada (FSD) | ✅ |
| RNF13 | Server Components por padrão | ✅ |
| RNF14 | Mutações via Server Actions | ✅ |

---

## 6. Como avaliar rapidamente

1. Acesse o link público e clique em **Cadastre-se**.
2. Crie uma conta e faça login.
3. No **Perfil**, informe sua altura.
4. Registre um **treino** (e crie um **modelo** para reaproveitar).
5. Crie alguns **hábitos** e marque-os no checklist do dia.
6. Registre seu **peso** algumas vezes para ver o **IMC** e o gráfico.
7. Volte ao **Dashboard** (semanal e mensal) para ver os indicadores consolidados.
