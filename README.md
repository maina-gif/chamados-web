# Sistema de Chamados de TI — TechServ

Painel web responsivo para registrar, acompanhar e concluir chamados de suporte. A interface substitui o menu de terminal, mantendo JavaScript, Node.js e MySQL.

## Funcionalidades

O painel cadastra chamados com solicitante, descrição e prioridade; gera identificador e data automaticamente; lista e pesquisa registros; filtra por prioridade e status; consulta detalhes pelo ID; mostra resumo por status; e atualiza o fluxo apenas em `aberto → em atendimento → concluído`.

## Execução local no IntelliJ

Pré-requisitos: Node.js 18+, MySQL 8+ e IntelliJ IDEA.

```bash
npm install
```

Copie `.env.example` para `.env` e ajuste a senha. Depois crie o banco vazio no MySQL:

```sql
CREATE DATABASE sistema_chamados CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

A tabela `chamados` é criada automaticamente na inicialização. Execute:

```bash
npm start
```

Abra `http://localhost:3000`.

## API

`GET /api/chamados` lista e aceita `prioridade` e `status`; `GET /api/chamados/:id` consulta; `POST /api/chamados` cadastra; `PATCH /api/chamados/:id/status` avança o status; `GET /api/chamados/resumo` retorna as contagens; `GET /api/health` verifica a aplicação.

Todas as consultas que recebem dados usam parâmetros SQL. O servidor valida regras antes de gravar e o MySQL reforça os tamanhos mínimos.

## Estrutura

`server.js` concentra o servidor e as rotas. `src/db.js` configura o pool e a tabela. `src/repository.js` contém SQL parametrizado. `src/validation.js` centraliza validações e transições. `public/` contém o painel, estilos e interações. `plan.md` registra as decisões de implementação e `TODO.md` mantém o escopo.

## Demonstração da atividade

Cadastre Ana Souza (alta), Bruno Lima (média), Carla Santos (baixa) e Diego Alves (alta). Avance Ana para `em atendimento`; avance Bruno para `em atendimento` e depois `concluído`; mantenha Carla e Diego abertos. O resumo esperado é: 2 abertos, 1 em atendimento e 1 concluído.
