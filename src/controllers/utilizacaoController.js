const Utilizacao = require('../models/Utilizacao');

let utilizacoes = [];
let idCounter = 1;

module.exports = {
  create: (req, res) => {
    const { motoristaId, automovelId, motivo } = req.body;

    if (!motoristaId || !automovelId || !motivo) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    const automovelEmUso = utilizacoes.find(u => u.automovelId === automovelId && !u.dataFim);
    if (automovelEmUso) {
      return res.status(400).json({ error: 'O automóvel já está em uso!' });
    }

    const motoristaEmUso = utilizacoes.find(u => u.motoristaId === motoristaId && !u.dataFim);
    if (motoristaEmUso) {
      return res.status(400).json({ error: 'O motorista já está utilizando outro automóvel!' });
    }

    const novaUtilizacao = new Utilizacao(idCounter++, motoristaId, automovelId, motivo, new Date().toISOString());
    utilizacoes.push(novaUtilizacao);
    return res.status(201).json(novaUtilizacao);
  },

  finalize: (req, res) => {
    const { id } = req.params;
    const utilizacao = utilizacoes.find(u => u.id === parseInt(id));

    if (!utilizacao) {
      return res.status(404).json({ error: 'Registro de utilização não encontrado!' });
    }

    if (utilizacao.dataFim) {
      return res.status(400).json({ error: 'Utilização já finalizada!' });
    }

    utilizacao.dataFim = new Date().toISOString();
    return res.json(utilizacao);
  },

  getAll: (req, res) => {
    return res.json(utilizacoes);
  },

  // Simulação do banco em memória
  __setUtilizacoes: (data) => {
    utilizacoes = data;
  },
};
