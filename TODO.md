# Entregas

- [x] O painel web permite cadastrar solicitante, descrição e prioridade baixa, média ou alta, validando solicitante com no mínimo 3 caracteres e descrição com no mínimo 10 caracteres.
- [x] Todo novo chamado recebe identificador único, data de abertura automática e status inicial `aberto`.
- [x] O painel lista chamados com identificador, solicitante, descrição, prioridade, status e data.
- [x] O painel consulta um chamado pelo identificador e mostra mensagem clara quando ele não existe; chamados concluídos continuam consultáveis.
- [x] O painel filtra por prioridade e por status `aberto`, `em atendimento` ou `concluído`.
- [x] O painel atualiza status apenas nas transições `aberto → em atendimento → concluído` e orienta quando a transição é inválida.
- [x] O painel exibe o resumo da quantidade de chamados por status.
- [x] A API usa consultas SQL parametrizadas e persiste dados em MySQL após reinício.
- [x] O projeto contém documentação de configuração, estrutura, regras de negócio e roteiro da demonstração.
- [x] A aplicação escuta na porta configurada, expõe `/manus-routes.json` e está pronta para Preview/publicação.
