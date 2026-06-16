# Requisitos — Fhit

## 1. Requisitos Funcionais

| # | Requisito |
|---|-----------|
| RF01 | O usuário deve se cadastrar na plataforma informando nome, e-mail e senha para ter acesso às funcionalidades do sistema. |
| RF02 | O usuário deve conseguir fazer login com e-mail e senha e manter sessão autenticada entre acessos. |
| RF03 | O sistema deve permitir que o usuário registre sessões de treino informando data, grupos musculares trabalhados, exercícios, séries, repetições e carga utilizada. |
| RF04 | O sistema deve permitir que o usuário visualize o histórico completo de treinos anteriores com todos os detalhes registrados. |
| RF05 | O sistema deve permitir que o usuário crie modelos de treino reutilizáveis para agilizar o registro de sessões recorrentes. |
| RF06 | O sistema deve permitir que o usuário cadastre e gerencie um checklist de hábitos diários recorrentes, como hidratação, sono e alongamento. |
| RF07 | O sistema deve registrar diariamente quais hábitos foram concluídos e quais foram ignorados pelo usuário. |
| RF08 | O sistema deve calcular e exibir a sequência de dias consecutivos (streak) em que o usuário completou todos os hábitos do dia. |
| RF09 | O sistema deve permitir que o usuário cadastre metas pessoais de saúde e condicionamento, informando o tipo de meta, valor-alvo e prazo. |
| RF10 | O sistema deve exibir o progresso atual de cada meta com indicador visual de percentual de conclusão. |
| RF11 | O sistema deve permitir que o usuário registre seu peso corporal periodicamente para acompanhamento da evolução ao longo do tempo. |
| RF12 | O sistema deve permitir que o usuário registre suas medidas corporais (cintura, quadril, peito, braço e coxa) para acompanhamento evolutivo. |
| RF13 | O sistema deve calcular automaticamente o IMC do usuário com base no peso e altura cadastrados e classificar o resultado (abaixo do peso, normal, sobrepeso, obesidade). |
| RF14 | O sistema deve exibir um dashboard semanal com resumo das sessões de treino realizadas, hábitos concluídos e progresso das metas no período. |
| RF15 | O sistema deve exibir um dashboard mensal com visão consolidada da evolução do usuário, incluindo gráficos de peso, frequência de treinos e taxa de conclusão de hábitos. |
| RF16 | O sistema deve enviar feedback visual ao usuário em todas as ações de formulário, exibindo mensagens de sucesso ou erro de forma clara. |
| RF17 | O usuário deve conseguir editar ou excluir registros de treino, hábitos e metas já cadastrados. |
| RF18 | O sistema deve proteger todas as rotas autenticadas, redirecionando usuários não logados para a página de login. |
| RF19 | O sistema deve garantir que cada usuário acesse apenas seus próprios dados, sem visibilidade sobre os registros de outros usuários. |
| RF20 | O sistema deve exibir estados de carregamento adequados enquanto dados estão sendo buscados no banco de dados. |

## 2. Requisitos Não Funcionais

| # | Requisito |
|---|-----------|
| RNF01 | A aplicação deve ser desenvolvida utilizando Next.js 16 com App Router e TypeScript. |
| RNF02 | O banco de dados utilizado deve ser o PostgreSQL, acessado via Prisma ORM, atendendo ao requisito obrigatório de uso de banco de dados relacional. |
| RNF03 | A autenticação deve ser implementada com NextAuth.js, garantindo sessões seguras e persistentes entre acessos. |
| RNF04 | Todas as entradas de dados de formulários devem ser validadas com Zod, tanto no cliente quanto no servidor, prevenindo dados inconsistentes. |
| RNF05 | A aplicação deve ser responsiva e funcionar corretamente em dispositivos móveis, tablets e desktops, seguindo a abordagem mobile first. |
| RNF06 | A interface deve seguir identidade visual moderna e limpa, com uso consistente de cores, tipografia e espaçamentos definidos via Tailwind CSS. |
| RNF07 | A aplicação deve ser compatível com os navegadores Google Chrome, Mozilla Firefox, Microsoft Edge e Safari nas versões mais recentes. |
| RNF08 | As senhas dos usuários devem ser armazenadas de forma criptografada utilizando algoritmo de hashing seguro, nunca em texto puro. |
| RNF09 | A aplicação deve ser hospedada na plataforma Vercel com deploy contínuo a partir do repositório principal no GitHub. |
| RNF10 | O banco de dados em produção deve ser hospedado no NeonDB. |
| RNF11 | O sistema deve tratar e registrar erros de forma que o usuário nunca visualize mensagens técnicas ou stack traces na interface. |
| RNF12 | O código deve ser organizado seguindo estrutura de pastas padronizada com separação clara entre componentes, actions, validações e tipos. |
| RNF13 | A aplicação deve utilizar Server Components do Next.js por padrão, com Client Components apenas quando estritamente necessário para interatividade. |
| RNF14 | As mutações de dados devem ser realizadas via Server Actions, evitando criação desnecessária de rotas de API REST. |
