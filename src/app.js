const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const exercicioRoutes = require("./routes/exercicioRoutes");
const treinoRoutes = require("./routes/treinoRoutes");
const alunoRoutes = require("./routes/alunoRoutes");
const professorRoutes = require("./routes/professorRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/exercicios", exercicioRoutes);
app.use("/treinos", treinoRoutes);
app.use("/alunos", alunoRoutes);
app.use("/professores", professorRoutes);

app.get("/", (req, res) => res.json({ status: "ok", app: "gymcontrol-api" }));

module.exports = app;
