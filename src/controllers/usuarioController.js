const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

function gerarToken(usuario) {
  return jwt.sign({ usuario }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

module.exports = {
  async list(req, res) {
    console.log("netoru");

    const users = await Usuario.query().select(
      "id",
      "nome",
      "sobrenome",
      "email",
      "tipo",
      "created_at"
    );

    console.log(users);

    console.log("netoru");
    res.json(users);
  },

  async get(req, res) {
    const user = await Usuario.query()
      .findById(req.params.id)
      .select("id", "nome", "sobrenome", "email", "tipo", "created_at");
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(user);
  },

  async create(req, res) {
    try {
      const { nome, sobrenome, email, tipo, senha } = req.body;

      if (!nome || !sobrenome || !email || !tipo || !senha) {
        return res.status(400).json({
          message: "Campos obrigatórios: nome, sobrenome, email, tipo e senha.",
        });
      }

      const emailExists = await Usuario.query().findOne({ email });
      if (emailExists) {
        return res.status(409).json({ message: "Email já cadastrado." });
      }

      // 3️⃣ Hash da senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // 4️⃣ Criar usuário
      const newUser = await Usuario.query().insert({
        nome,
        sobrenome,
        email,
        tipo,
        senha: hashedPassword,
      });

      // 5️⃣ Retornar sem expor senha
      return res.status(201).json({
        id: newUser.id,
        nome: newUser.nome,
        sobrenome: newUser.sobrenome,
        email: newUser.email,
        tipo: newUser.tipo,
        created_at: newUser.created_at,
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro ao criar usuário." });
    }
  },

  async remove(req, res) {
    const id = req.params.id;
    await Usuario.query().deleteById(id);
    res.json({ message: "Removido" });
  },

  async updateMe(req, res) {
    try {
      const loggedUser = req.user.usuario;

      const { nome, sobrenome, email, tipo, senha } = req.body;

      const dataToUpdate = {};

      if (nome !== undefined) dataToUpdate.nome = nome;
      if (sobrenome !== undefined) dataToUpdate.sobrenome = sobrenome;
      if (email !== undefined) dataToUpdate.email = email;
      if (tipo !== undefined) dataToUpdate.tipo = tipo;
      if (senha !== undefined) dataToUpdate.senha = senha;

      // Ninguém mandou nada pra atualizar
      if (Object.keys(dataToUpdate).length === 0) {
        return res
          .status(400)
          .json({ message: "Nenhum dado enviado para atualizar." });
      }

      const updatedUser = await Usuario.query()
        .patchAndFetchById(loggedUser.id, dataToUpdate)
        .select("id", "nome", "sobrenome", "email", "tipo");

      console.log("Usuário atualizado:", updatedUser);

      gerarToken(updatedUser);

      return res.json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  },

  async updateUser(req, res) {
    try {
      const targetId = req.params.id; // quem será atualizado

      const { nome, sobrenome, email, tipo, senha } = req.body;

      const dataToUpdate = {};

      if (nome !== undefined) dataToUpdate.nome = nome;
      if (sobrenome !== undefined) dataToUpdate.sobrenome = sobrenome;
      if (email !== undefined) dataToUpdate.email = email;
      if (tipo !== undefined) dataToUpdate.tipo = tipo;
      if (senha !== undefined) dataToUpdate.senha = senha; // ideal: hashear antes

      if (Object.keys(dataToUpdate).length === 0) {
        return res
          .status(400)
          .json({ message: "Nenhum dado enviado para atualizar." });
      }

      const updatedUser = await Usuario.query()
        .patchAndFetchById(targetId, dataToUpdate)
        .select("id", "nome", "sobrenome", "email", "tipo");

      return res.json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  },
};
