exports.up = function (knex) {
  return knex.schema.createTable("treinos", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.text("descricao");

    table
      .integer("aluno_id")
      .unsigned()
      .references("id")
      .inTable("usuarios")
      .onDelete("SET NULL");

    table
      .integer("professor_id")
      .unsigned()
      .references("id")
      .inTable("usuarios")
      .onDelete("SET NULL");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("treinos");
};
