const express = require('express');
const router = express.Router();
const treinoController = require('../controllers/treinoController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// treinos CRUD
router.get('/', auth, treinoController.list);
router.get('/:id', auth, treinoController.get);
router.post('/', auth, treinoController.create);
router.put('/:id', auth, treinoController.update);
router.delete('/:id', auth, admin, treinoController.remove);

// associacoes treino <-> exercicio
router.post('/:id/exercicios', auth, admin, treinoController.addExercicio); // admin required to modify associacao
router.delete('/:id/exercicios/:exercicioId', auth, admin, treinoController.removeExercicio);

module.exports = router;
