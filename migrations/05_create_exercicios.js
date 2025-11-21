exports.up = function(knex) {
  return knex.schema.createTable('exercicios', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('categoria').nullable();
    table.string('equipamento').nullable();
    table.text('descricao').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('exercicios');
};
