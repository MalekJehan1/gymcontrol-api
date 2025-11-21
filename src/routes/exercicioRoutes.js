const express = require('express');
const router = express.Router();
const exercicioController = require('../controllers/exercicioController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.get('/', auth, exercicioController.list);
router.get('/:id', auth, exercicioController.get);
router.post('/', auth, admin, exercicioController.create);
router.put('/:id', auth, admin, exercicioController.update);
router.delete('/:id', auth, admin, exercicioController.remove);

module.exports = router;
