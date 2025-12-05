const professor = require("../models/Professor");

module.exports = {
  async getprofessores(req, res) {
    const professors = await professor
      .query()
      .join("usuarios", "professores.usuario_id", "usuarios.id")
      .select(
        "professores.id as professor_id",
        "usuarios.id as usuario_id",
        "usuarios.nome",
        "usuarios.sobrenome",
        "usuarios.email",
        "usuarios.created_at"
      );
    res.json(professors);
  },
};
