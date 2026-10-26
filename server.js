const path = require('path');
const express = require('express');
const repo = require('./src/repository');
const { garantirSchema } = require('./src/db');
const { STATUS, validarCadastro, validarStatus, transicaoPermitida } = require('./src/validation');

const app = express();
const PORT = Number(process.env.PORT || 3000);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => res.json({ ok: true, servico: 'chamados' }));

app.get('/api/chamados', async (req, res, next) => {
  try {
    const { prioridade, status } = req.query;
    const chamados = await repo.listar({ prioridade, status });
    res.json(chamados);
  } catch (error) { next(error); }
});

app.get('/api/chamados/resumo', async (_req, res, next) => {
  try {
    const linhas = await repo.obterResumo();
    const resumo = Object.fromEntries(STATUS.map((status) => [status, Number(linhas.find((linha) => linha.status === status)?.quantidade || 0)]));
    res.json(resumo);
  } catch (error) { next(error); }
});

app.get('/api/chamados/:id', async (req, res, next) => {
  try {
    const chamado = await repo.buscarPorId(Number(req.params.id));
    if (!chamado) return res.status(404).json({ erro: 'Chamado não encontrado.' });
    res.json(chamado);
  } catch (error) { next(error); }
});

app.post('/api/chamados', async (req, res, next) => {
  try {
    const dados = { solicitante: req.body.solicitante, descricao: req.body.descricao, prioridade: req.body.prioridade };
    const erros = validarCadastro(dados);
    if (erros.length) return res.status(400).json({ erro: erros.join(' ') });
    const chamado = await repo.criar(dados);
    res.status(201).json(chamado);
  } catch (error) { next(error); }
});

app.patch('/api/chamados/:id/status', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const novoStatus = String(req.body.status || '').trim().toLowerCase();
    if (!validarStatus(novoStatus)) return res.status(400).json({ erro: 'Status inválido.' });
    const chamado = await repo.buscarPorId(id);
    if (!chamado) return res.status(404).json({ erro: 'Chamado não encontrado.' });
    if (!transicaoPermitida(chamado.status, novoStatus)) return res.status(409).json({ erro: `Transição não permitida: ${chamado.status} → ${novoStatus}.` });
    res.json(await repo.atualizarStatus(id, novoStatus));
  } catch (error) { next(error); }
});

app.use('/api', (_req, res) => res.status(404).json({ erro: 'Endpoint não encontrado.' }));
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ erro: 'Não foi possível concluir a operação agora.' }); });

async function iniciar() {
  await garantirSchema();
  app.listen(PORT, '0.0.0.0', () => console.log(`Sistema de Chamados disponível na porta ${PORT}`));
}

iniciar().catch((error) => { console.error('Falha ao iniciar:', error.message); process.exit(1); });
