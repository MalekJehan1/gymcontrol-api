const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Protege TODAS as rotas abaixo
router.use(authMiddleware);

// ------ Rotas do próprio usuário ------
router.put('/me', usuarioController.updateMe);

// ------ Rotas de admin ------
router.get('/', adminMiddleware, usuarioController.list);
router.get('/:id', adminMiddleware, usuarioController.get);
router.delete('/:id', adminMiddleware, usuarioController.remove);

module.exports = router;
