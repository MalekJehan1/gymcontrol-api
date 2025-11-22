const express = require('express');
const router = express.Router();
const treinoController = require('../controllers/treinoController');
const auth = require('../middleware/authMiddleware');
const professor = require('../middleware/professorMiddleware');

// Rotas públicas para qualquer usuário autenticado
router.get('/', auth, treinoController.list);                 
router.get('/:id', auth, treinoController.get);              


// Rotas protegidas para professores ou administradores
router.post('/', auth, professor, treinoController.create);   
router.put('/:id', auth, professor, treinoController.update); 
router.delete('/:id', auth, professor, treinoController.remove); 
router.post('/:id/exercicios', auth, professor, treinoController.addExercicio);
router.delete('/:id/exercicios/:exercicioId', auth, professor, treinoController.removeExercicio);


module.exports = router;
