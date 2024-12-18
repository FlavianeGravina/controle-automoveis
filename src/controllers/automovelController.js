const Automovel = require('../models/Automovel');

let automoveis = []; // Simula o banco de dados em memória
let idCounter = 1;

module.exports = {
  // Criar automóvel
  create: (req, res) => {
    const { placa, cor, marca } = req.body;
    if (!placa || !cor || !marca) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }
    const novoAutomovel = new Automovel(idCounter++, placa, cor, marca);
    automoveis.push(novoAutomovel);
    return res.status(201).json(novoAutomovel);
  },

  // Listar automóveis
  getAll: (req, res) => {
    return res.json(automoveis);
  },

  // Buscar automóvel por ID
  getById: (req, res) => {
    const automovel = automoveis.find(a => a.id === parseInt(req.params.id));
    if (!automovel) {
      return res.status(404).json({ error: 'Automóvel não encontrado!' });
    }
    return res.json(automovel);
  },

  // Atualizar automóvel
  update: (req, res) => {
    const automovel = automoveis.find(a => a.id === parseInt(req.params.id));
    if (!automovel) {
      return res.status(404).json({ error: 'Automóvel não encontrado!' });
    }

    const { placa, cor, marca } = req.body;
    if (placa) automovel.placa = placa;
    if (cor) automovel.cor = cor;
    if (marca) automovel.marca = marca;

    return res.json(automovel);
  },

  // Remover automóvel
  remove: (req, res) => {
    const index = automoveis.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Automóvel não encontrado!' });
    }

    automoveis.splice(index, 1);
    return res.status(204).send();
  },

  // Simulação do banco em memória (para testes)
  __setAutomoveis: (data) => {
    automoveis = data;
  },
};
