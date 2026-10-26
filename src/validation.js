const PRIORIDADES = ['baixa', 'média', 'alta'];
const STATUS = ['aberto', 'em atendimento', 'concluído'];
const TRANSICOES = { aberto: 'em atendimento', 'em atendimento': 'concluído' };

function validarCadastro({ solicitante, descricao, prioridade }) {
  const erros = [];
  if (!solicitante || solicitante.trim().length < 3) erros.push('O solicitante deve ter pelo menos 3 caracteres.');
  if (!descricao || descricao.trim().length < 10) erros.push('A descrição deve ter pelo menos 10 caracteres.');
  if (!PRIORIDADES.includes(String(prioridade || '').trim().toLowerCase())) erros.push('A prioridade deve ser baixa, média ou alta.');
  return erros;
}

function validarStatus(status) {
  return STATUS.includes(String(status || '').trim().toLowerCase());
}

function transicaoPermitida(atual, proximo) {
  return TRANSICOES[atual] === proximo;
}

module.exports = { PRIORIDADES, STATUS, validarCadastro, validarStatus, transicaoPermitida };
