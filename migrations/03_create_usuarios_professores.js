// migrations/XXXXXXXX_create_usuarios_professores.js
exports.up = function(knex) {
  return knex.schema.createTable('usuarios_professores', table => {
    table.increments('id').primary();

    table
      .integer('usuario_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('usuarios')
      .onDelete('CASCADE');

    table
      .integer('professor_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('professores')
      .onDelete('CASCADE');

    table.unique(['usuario_id', 'professor_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('usuarios_professores');
};
