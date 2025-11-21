const BaseModel = require('./BaseModel');

class Exercicio extends BaseModel {
  static get tableName() {
    return 'exercicios';
  }

  static get relationMappings() {
    const Treino = require('./Treino');

    return {
      treinos: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Treino,
        join: {
          from: 'exercicios.id',
          through: {
            from: 'treino_exercicios.exercicio_id',
            to: 'treino_exercicios.treino_id'
          },
          to: 'treinos.id'
        }
      }
    };
  }
}

module.exports = Exercicio;
