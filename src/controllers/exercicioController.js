const Exercicio = require("../models/Exercicio");

module.exports = {
  async list(req, res) {
    const rows = await Exercicio.query().orderBy("nome");
    res.json(rows);
  },

  async get(req, res) {
    const ex = await Exercicio.query().findById(req.params.id);
    if (!ex)
      return res.status(404).json({ message: "Exercício não encontrado" });
    res.json(ex);
  },

  async create(req, res) {
    console.log("entrou");
    const { nome, equipamento, descricao } = req.body;
    const created = await Exercicio.query().insert({
      nome,
      equipamento,
      descricao,
    });
    res.status(201).json(created);
  },

  async update(req, res) {
    const id = req.params.id;
    const payload = req.body;
    const updated = await Exercicio.query().patchAndFetchById(id, payload);
    res.json(updated);
  },

  async remove(req, res) {
    await Exercicio.query().deleteById(req.params.id);
    res.json({ message: "Removido" });
  },
};
