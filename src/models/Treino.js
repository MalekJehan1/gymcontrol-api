const BaseModel = require("./BaseModel");

class Treino extends BaseModel {
  static get tableName() {
    return "treinos";
  }

  static get relationMappings() {
    const Exercicio = require("./Exercicio");
    const Aluno = require("./Aluno");
    const Usuario = require("./Usuario");

    return {
      exercicios: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Exercicio,
        join: {
          from: "treinos.id",
          through: {
            from: "treino_exercicios.treino_id",
            to: "treino_exercicios.exercicio_id",
            // 🔥 IMPORTANTE: retorna séries, reps e descanso!
            extra: ["series", "repeticoes", "descanso_segundos"],
          },
          to: "exercicios.id",
        },
      },

      alunos: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Aluno,
        join: {
          from: "treinos.id",
          through: {
            from: "aluno_treinos.treino_id",
            to: "aluno_treinos.aluno_id",
          },
          to: "alunos.id",
        },
      },

      usuario: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: "treinos.usuario_id",
          to: "usuarios.id",
        },
      },
    };
  }
}

module.exports = Treino;
