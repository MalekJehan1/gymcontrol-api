exports.up = function (knex) {
  return knex.schema.createTable("usuarios", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.string("sobrenome").notNullable();
    table.string("email").notNullable().unique();
    table.string("senha").notNullable();
    table
      .enu("tipo", ["admin", "aluno", "professor"])
      .notNullable()
      .defaultTo("aluno");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("usuarios");
};
