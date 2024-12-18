const express = require('express');
const router = express.Router();
const utilizacaoController = require('../controllers/utilizacaoController');

// Rotas de utilização de automóveis
router.post('/', utilizacaoController.create);
router.put('/:id/finalizar', utilizacaoController.finalize);
router.get('/', utilizacaoController.getAll);

module.exports = router;
