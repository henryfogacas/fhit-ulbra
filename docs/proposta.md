# Proposta — Fhit

## Visão Geral

O **Fhit** é um sistema web voltado ao acompanhamento integrado de rotinas de saúde e condicionamento físico, desenvolvido para atender pessoas que praticam atividade física e desejam organizar e monitorar sua evolução de forma centralizada.

## Problema

O problema que motiva o projeto é a **fragmentação das ferramentas disponíveis**: quem frequenta academia utiliza um aplicativo para treinos, outro para hábitos e anotações manuais para metas, o que dificulta uma visão unificada do progresso e contribui para a desistência da rotina.

## Solução

O Fhit resolve essa questão reunindo, em uma única plataforma:

- O **registro detalhado de sessões de treino** com exercícios, séries, repetições e cargas;
- Um **checklist recorrente de hábitos diários** com controle de sequência;
- Um **sistema de metas** com indicadores visuais de progresso;
- O **acompanhamento de peso e medidas corporais** ao longo do tempo;
- O **cálculo automático do IMC** com classificação.

A aplicação contará com **dashboards semanal e mensal** para que o usuário visualize sua evolução de forma clara e motivadora. O sistema terá **autenticação de usuários** com perfis individuais, garantindo privacidade e isolamento dos dados.

## Tecnologias

Para o desenvolvimento serão utilizadas as seguintes tecnologias:

- **Next.js 16 com TypeScript** no frontend e backend;
- **Tailwind CSS** para estilização responsiva;
- **Prisma ORM** para abstração do banco de dados relacional **PostgreSQL**, atendendo ao requisito obrigatório de persistência de dados;
- **NextAuth.js** para autenticação.

## Público-Alvo

Praticantes de academia e pessoas que buscam organizar hábitos saudáveis com apoio de tecnologia.
