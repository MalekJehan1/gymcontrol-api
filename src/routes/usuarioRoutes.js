const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.use(authMiddleware);

// ------ Rotas do próprio usuário ------
router.put("/update-me", usuarioController.updateMe);

// ------ Rotas de admin ------
router.post("/", adminMiddleware, usuarioController.create);
router.get("/", adminMiddleware, usuarioController.list);
router.get("/:id", adminMiddleware, usuarioController.get);
router.put("/:id", adminMiddleware, usuarioController.updateUser);
router.delete("/:id", adminMiddleware, usuarioController.remove);

module.exports = router;
