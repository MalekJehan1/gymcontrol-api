exports.up = function (knex) {
  return knex.schema.createTable("professores_alunos", (table) => {
    table.increments("id").primary();

    table
      .integer("professor_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("usuarios")
      .onDelete("CASCADE");

    table
      .integer("aluno_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("usuarios")
      .onDelete("CASCADE");

    table.unique(["professor_id", "aluno_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("professores_alunos");
};
