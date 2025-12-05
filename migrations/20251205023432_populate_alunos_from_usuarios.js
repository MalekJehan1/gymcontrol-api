exports.up = async function (knex) {
  const alunos = await knex("usuarios").where("tipo", "aluno");

  for (const user of alunos) {
    await knex("alunos").insert({
      usuario_id: user.id,
      idade: null,
      peso: null,
      altura: null,
    });
  }
};

exports.down = async function (knex) {
  await knex("alunos")
    .whereIn("usuario_id", knex("usuarios").where("tipo", "aluno").select("id"))
    .del();
};
