# Plano — Sistema de Chamados de TI

## Objetivo
Transformar a aplicação de terminal em um painel web interno para atendentes da TechServ, preservando JavaScript, MySQL e todas as regras da atividade prática.

## Abordagem
- Servidor Express em JavaScript com API REST `/api/chamados`.
- Frontend web responsivo em HTML, CSS e JavaScript sem dependência de framework, para reduzir risco e acelerar a entrega.
- MySQL gerenciado via `DATABASE_URL`, com inicialização idempotente da tabela `chamados`.
- Consultas parametrizadas, validações no servidor e máquina de estados para status.
- Um painel único com indicadores, filtros, tabela de chamados, formulário de cadastro e consulta rápida.

## Direção visual escolhida
- **Estilo:** dashboard operacional editorial, com aparência de central de operações confiável e objetiva.
- **Princípios:** hierarquia de informação forte; leitura rápida; estados visuais consistentes; ações acessíveis em desktop e celular.
- **Cores:** azul-marinho para confiança e navegação; fundo marfim frio para reduzir fadiga; amarelo âmbar para pendências; verde para conclusão; vermelho apenas para erros.
- **Layout:** barra lateral compacta e conteúdo principal em fluxo vertical, com resumo no topo e operações organizadas por prioridade.
- **Assinaturas:** marca “TS / TechServ”; chips de status; linha de destaque lateral em cada chamado.
- **Interação:** feedback imediato por toast, confirmação visual após salvar e bloqueio das transições inválidas.
- **Animação:** transições curtas de 160–220ms, sem movimento decorativo excessivo.
- **Tipografia:** Inter para interface e títulos; números de resumo em peso alto.
- **Voz:** direta, orientativa e profissional. Ex.: “Acompanhe o que precisa de atenção.” / “Chamado registrado e pronto para triagem.”

## Estrutura
- `server.js`: servidor HTTP, rotas e inicialização.
- `src/db.js`: pool MySQL e criação idempotente da tabela.
- `src/validation.js`: regras de campos e transições.
- `src/repository.js`: SQL parametrizado.
- `public/index.html`: estrutura do painel.
- `public/styles.css`: sistema visual responsivo.
- `public/app.js`: estado da interface, chamadas à API e feedback.
- `public/manus-routes.json`: manifesto de rotas.
- `README.md`: execução, configuração, regras e publicação.

## Regras preservadas
Solicitante com pelo menos 3 caracteres; descrição com pelo menos 10; prioridade baixa, média ou alta; status inicial aberto; transições somente aberto → em atendimento → concluído; identificação automática; data automática; consulta de inexistente sem encerrar; concluídos continuam disponíveis; persistência e SQL parametrizado.
