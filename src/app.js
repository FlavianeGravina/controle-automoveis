const express = require('express');

const app = express();
app.use(express.json());

// Importação das rotas
const automovelRoutes = require('./routes/automovelRoutes');
const motoristaRoutes = require('./routes/motoristaRoutes');
const utilizacaoRoutes = require('./routes/utilizacaoRoutes');
app.use('/api/utilizacoes', utilizacaoRoutes);

// Rotas de Automóveis
app.use('/api/automoveis', automovelRoutes);

// Rotas de Motoristas
app.use('/api/motoristas', motoristaRoutes);

// Rota de exemplo
app.get('/', (req, res) => {
   res.send('API de Controle de Automóveis');
});

module.exports = app;
