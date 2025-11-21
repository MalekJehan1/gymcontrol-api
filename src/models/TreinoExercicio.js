const BaseModel = require('./BaseModel');

class TreinoExercicio extends BaseModel {
  static get tableName() {
    return 'treino_exercicios';
  }
}

module.exports = TreinoExercicio;
