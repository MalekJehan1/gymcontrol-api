exports.up = function(knex) {
  return knex.schema.createTable('professores', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('especialidade').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('professores');
};
