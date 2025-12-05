exports.up = function (knex) {
  return knex.schema.alterTable("treinos", (table) => {
    table
      .integer("aluno_id")
      .unsigned()
      .references("id")
      .inTable("alunos")
      .onDelete("SET NULL");

    table
      .integer("professor_id")
      .unsigned()
      .references("id")
      .inTable("professores")
      .onDelete("SET NULL");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("treinos", (table) => {
    table.dropColumn("aluno_id");
    table.dropColumn("professor_id");
  });
};
