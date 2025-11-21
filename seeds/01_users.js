const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('usuarios').del();
  const hash = await bcrypt.hash('admin123', 10);
  await knex('usuarios').insert([
    { id: 1, nome: 'Admin', email: 'admin@gym.local', senha: hash, tipo: 'admin' }
  ]);
};
