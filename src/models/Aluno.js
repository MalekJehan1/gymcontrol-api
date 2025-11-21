const BaseModel = require('./BaseModel');

class Aluno extends BaseModel {
  static get tableName() {
    return 'alunos';
  }

  static get relationMappings() {
    const Treino = require('./Treino');

    return {
      treinos: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Treino,
        join: {
          from: 'alunos.id',
          through: {
            from: 'aluno_treinos.aluno_id',
            to: 'aluno_treinos.treino_id'
          },
          to: 'treinos.id'
        }
      }
    };
  }
}

module.exports = Aluno;
