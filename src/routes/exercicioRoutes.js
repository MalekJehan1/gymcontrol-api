const express = require('express');
const router = express.Router();
const exercicioController = require('../controllers/exercicioController');
const auth = require('../middleware/authMiddleware');
const professor = require('../middleware/professorMiddleware');


// Rotas públicas para qualquer usuário autenticado
router.get('/', auth, exercicioController.list);
router.get('/:id', auth, exercicioController.get);

// Rotas protegidas para professores ou administradores
router.post('/', auth, professor, exercicioController.create);
router.put('/:id', auth, professor, exercicioController.update);
router.delete('/:id', auth, professor, exercicioController.remove);

module.exports = router;
