const express = require("express");
const router = express.Router();
const professor = require("../middleware/professorMiddleware");
const alunoController = require("../controllers/alunoController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, professor, alunoController.getAlunos);

module.exports = router;
