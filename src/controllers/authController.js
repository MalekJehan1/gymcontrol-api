const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  gerarToken(usuario) {
    return jwt.sign({ usuario }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },
  async register(req, res) {
    try {
      const { nome, sobrenome, email, senha } = req.body;

      if (!nome || !sobrenome || !email || !senha)
        return res.status(400).json({ message: "Campos inválidos" });

      const emailExists = await Usuario.query().findOne({ email });
      if (emailExists) {
        return res.status(409).json({ message: "Email já cadastrado." });
      }

      const hash = await bcrypt.hash(senha, 10);

      const user = await Usuario.query().insert({
        nome,
        email,
        sobrenome,
        senha: hash,
        tipo: "aluno",
      });

      delete user.senha;

      return res.status(201).json({
        auth: true,
        token: gerarToken(user),
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao criar usuário." });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const user = await Usuario.query().findOne({ email });
      if (!user)
        return res
          .status(401)
          .json({ auth: false, message: "Credenciais inválidas" });

      const ok = await bcrypt.compare(senha, user.senha);
      if (!ok)
        return res
          .status(401)
          .json({ auth: false, message: "Credenciais inválidas" });

      delete user.senha;

      return res.json({
        auth: true,
        token: gerarToken(user),
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ auth: false, message: "Erro no servidor" });
    }
  },

  async me(req, res) {
    try {
      const user = await Usuario.query()
        .findById(req.user.id)
        .select("id", "nome", "email", "tipo", "created_at");

      return res.json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  },

  async updateMe(req, res) {
    try {
      const { nome, email, senha } = req.body;

      const patch = {};
      if (nome) patch.nome = nome;
      if (email) patch.email = email;
      if (senha) patch.senha = await bcrypt.hash(senha, 10);

      const updated = await Usuario.query()
        .patchAndFetchById(req.user.id, patch)
        .select("id", "nome", "email", "tipo");

      return res.json({ user: updated });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  },
};
