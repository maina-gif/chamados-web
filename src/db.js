require('dotenv').config();
const mysql = require('mysql2/promise');

function criarPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL não configurada. Crie a variável com a conexão MySQL.');
  }
  const url = new URL(process.env.DATABASE_URL);
  const config = {
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
    waitForConnections: true,
    connectionLimit: 5,
    charset: 'utf8mb4'
  };
  if (url.searchParams.get('ssl') !== 'false') config.ssl = { rejectUnauthorized: false };
  return mysql.createPool(config);
}

const pool = criarPool();

async function garantirSchema() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS chamados (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      solicitante VARCHAR(120) NOT NULL,
      descricao VARCHAR(500) NOT NULL,
      prioridade ENUM('baixa','média','alta') NOT NULL,
      status ENUM('aberto','em atendimento','concluído') NOT NULL DEFAULT 'aberto',
      data_abertura DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT ck_solicitante_tamanho CHECK (CHAR_LENGTH(TRIM(solicitante)) >= 3),
      CONSTRAINT ck_descricao_tamanho CHECK (CHAR_LENGTH(TRIM(descricao)) >= 10),
      INDEX idx_chamados_status (status),
      INDEX idx_chamados_prioridade (prioridade)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

module.exports = { pool, garantirSchema };
