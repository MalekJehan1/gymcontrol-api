const Usuario = require('../models/Usuario');

module.exports = {
  async list(req, res) {
    const users = await Usuario.query().select('id','nome','email','tipo','created_at');
    res.json(users);
  },

  async get(req, res) {
    const user = await Usuario.query().findById(req.params.id).select('id','nome','email','tipo','created_at');
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  },

  async remove(req, res) {
    const id = req.params.id;
    await Usuario.query().deleteById(id);
    res.json({ message: 'Removido' });
  },

  async updateMe(req, res) {
    try {
      const userId = req.user.id; // pega do middleware de auth
      const { nome, email } = req.body;

      const updatedUser = await Usuario.query()
        .patchAndFetchById(userId, { nome, email });

      return res.json(updatedUser);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  }

};
