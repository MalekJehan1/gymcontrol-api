exports.up = function(knex) {
  return knex.schema.createTable('treino_exercicios', table => {
    table.increments('id').primary();
    table.integer('treino_id').unsigned().notNullable().references('id').inTable('treinos').onDelete('CASCADE');
    table.integer('exercicio_id').unsigned().notNullable().references('id').inTable('exercicios').onDelete('CASCADE');
    table.integer('series').nullable();
    table.integer('repeticoes').nullable();
    table.integer('descanso_segundos').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['treino_id','exercicio_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('treino_exercicios');
};
