// migrations/XXXXXXXX_create_usuarios_alunos.js
exports.up = function(knex) {
  return knex.schema.createTable('usuarios_alunos', table => {
    table.increments('id').primary();

    table
      .integer('usuario_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('usuarios')
      .onDelete('CASCADE');

    table
      .integer('aluno_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('alunos')
      .onDelete('CASCADE');

    table.unique(['usuario_id', 'aluno_id']); // evita duplicados
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('usuarios_alunos');
};
