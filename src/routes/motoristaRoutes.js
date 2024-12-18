const express = require('express');
const router = express.Router();
const motoristaController = require('../controllers/motoristaController');

// Rotas CRUD de Motoristas
router.post('/', motoristaController.create);
router.get('/', motoristaController.getAll);
router.get('/:id', motoristaController.getById);
router.put('/:id', motoristaController.update);
router.delete('/:id', motoristaController.remove);

module.exports = router;
