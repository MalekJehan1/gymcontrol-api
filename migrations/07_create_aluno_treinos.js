exports.up = function(knex) {
  return knex.schema.createTable('aluno_treinos', table => {
    table.increments('id').primary();
    table.integer('aluno_id').unsigned().notNullable().references('id').inTable('alunos').onDelete('CASCADE');
    table.integer('treino_id').unsigned().notNullable().references('id').inTable('treinos').onDelete('CASCADE');
    table.boolean('ativo').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['aluno_id','treino_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('aluno_treinos');
};
