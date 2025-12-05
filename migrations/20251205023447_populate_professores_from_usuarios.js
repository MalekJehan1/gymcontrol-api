exports.up = async function (knex) {
  const professores = await knex("usuarios").where("tipo", "professor");

  for (const user of professores) {
    await knex("professores").insert({
      usuario_id: user.id,
    });
  }
};

exports.down = async function (knex) {
  await knex("professores")
    .whereIn(
      "usuario_id",
      knex("usuarios").where("tipo", "professor").select("id")
    )
    .del();
};
