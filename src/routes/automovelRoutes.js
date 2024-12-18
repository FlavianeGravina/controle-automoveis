const express = require('express');
const router = express.Router();
const automovelController = require('../controllers/automovelController');

// Rotas CRUD de Automóveis
router.post('/', automovelController.create);
router.get('/', automovelController.getAll);
router.get('/:id', automovelController.getById);
router.put('/:id', automovelController.update);
router.delete('/:id', automovelController.remove);

module.exports = router;
