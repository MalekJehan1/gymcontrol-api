const express = require("express");
const router = express.Router();
const professor = require("../middleware/professorMiddleware");
const auth = require("../middleware/authMiddleware");
const professorController = require("../controllers/professorController");

router.get("/", auth, professor, professorController.getprofessores);

module.exports = router;
