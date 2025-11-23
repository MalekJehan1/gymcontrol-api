exports.up = function (knex) {
  return knex.schema.createTable("professores", (table) => {
    table.increments("id").primary();
    table
      .integer("usuario_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("usuarios")
      .onDelete("CASCADE");

    table.string("especialidade").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("professores");
};
