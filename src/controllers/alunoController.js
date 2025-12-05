const Aluno = require("../models/Aluno");

module.exports = {
  async getAlunos(req, res) {
    const alunos = await Aluno.query()
      .join("usuarios", "alunos.usuario_id", "usuarios.id")
      .select(
        "alunos.id as aluno_id",
        "usuarios.id as usuario_id",
        "usuarios.nome",
        "usuarios.sobrenome",
        "usuarios.email",
        "usuarios.created_at"
      );
    res.json(alunos);
  },
};
