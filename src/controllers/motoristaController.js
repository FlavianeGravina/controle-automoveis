const Motorista = require('../models/Motorista');

let motoristas = []; // Banco de dados em memória
let idCounter = 1;

module.exports = {
  // Criar motorista
  create: (req, res) => {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
    }
    const novoMotorista = new Motorista(idCounter++, nome);
    motoristas.push(novoMotorista);
    return res.status(201).json(novoMotorista);
  },

  // Listar motoristas com filtro
  getAll: (req, res) => {
    const { nome } = req.query;
    let resultado = motoristas;
    if (nome) resultado = resultado.filter(m => m.nome.includes(nome));
    return res.json(resultado);
  },

  // Buscar motorista por ID
  getById: (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido!' });
    }
    const motorista = motoristas.find(m => m.id === id);
    if (!motorista) {
      return res.status(404).json({ error: 'Motorista não encontrado!' });
    }
    return res.json(motorista);
  },

  // Atualizar motorista
  update: (req, res) => {
    const id = parseInt(req.params.id);
    const motorista = motoristas.find(m => m.id === id);
    if (!motorista) {
      return res.status(404).json({ error: 'Motorista não encontrado!' });
    }
    const { nome } = req.body;
    if (nome) motorista.nome = nome;
    return res.json(motorista);
  },

  // Remover motorista
  remove: (req, res) => {
    const id = parseInt(req.params.id);
    const index = motoristas.findIndex(m => m.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Motorista não encontrado!' });
    }
    motoristas.splice(index, 1);
    return res.status(204).send();
  },

  // Simulação do banco em memória para testes
  __setMotoristas: (data) => {
    motoristas = data; // Substitui o banco em memória durante os testes
  },
};
