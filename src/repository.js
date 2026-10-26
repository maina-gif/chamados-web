const { pool } = require('./db');

async function listar({ prioridade, status } = {}) {
  let sql = 'SELECT id, solicitante, descricao, prioridade, status, data_abertura FROM chamados WHERE 1 = 1';
  const params = [];
  if (prioridade) { sql += ' AND prioridade = ?'; params.push(prioridade); }
  if (status) { sql += ' AND status = ?'; params.push(status); }
  sql += ' ORDER BY id DESC';
  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function buscarPorId(id) {
  const [rows] = await pool.execute('SELECT id, solicitante, descricao, prioridade, status, data_abertura FROM chamados WHERE id = ?', [id]);
  return rows[0] || null;
}

async function criar({ solicitante, descricao, prioridade }) {
  const [result] = await pool.execute('INSERT INTO chamados (solicitante, descricao, prioridade) VALUES (?, ?, ?)', [solicitante.trim(), descricao.trim(), prioridade.trim().toLowerCase()]);
  return buscarPorId(result.insertId);
}

async function atualizarStatus(id, status) {
  await pool.execute('UPDATE chamados SET status = ? WHERE id = ?', [status, id]);
  return buscarPorId(id);
}

async function obterResumo() {
  const [rows] = await pool.execute('SELECT status, COUNT(*) AS quantidade FROM chamados GROUP BY status');
  return rows;
}

module.exports = { listar, buscarPorId, criar, atualizarStatus, obterResumo };
