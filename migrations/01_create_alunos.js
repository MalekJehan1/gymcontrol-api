exports.up = function(knex) {
  return knex.schema.createTable('alunos', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.integer('idade').nullable();
    table.decimal('peso', 5, 2).nullable();
    table.decimal('altura', 5, 2).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('alunos');
};
