const BaseModel = require("./BaseModel");

class Treino extends BaseModel {
  static get tableName() {
    return "treinos";
  }

  static get relationMappings() {
    const Exercicio = require("./Exercicio");
    const Aluno = require("./Aluno");
    const Professor = require("./Professor");

    return {
      exercicios: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Exercicio,
        join: {
          from: "treinos.id",
          through: {
            from: "treino_exercicios.treino_id",
            to: "treino_exercicios.exercicio_id",
            extra: ["series", "repeticoes", "descanso_segundos"],
          },
          to: "exercicios.id",
        },
      },

      aluno: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Aluno,
        join: {
          from: "treinos.aluno_id",
          to: "alunos.usuario_id",
        },
      },

      professor: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Professor,
        join: {
          from: "treinos.professor_id",
          to: "professores.usuario_id",
        },
      },
    };
  }
}

module.exports = Treino;
