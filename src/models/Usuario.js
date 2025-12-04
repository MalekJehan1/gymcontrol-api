const BaseModel = require("./BaseModel");

class Usuario extends BaseModel {
  static get tableName() {
    return "usuarios";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["nome", "sobrenome", "email", "senha"],
      properties: {
        id: { type: "integer" },
        nome: { type: "string", minLength: 1, maxLength: 255 },
        sobrenome: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string" },
        senha: { type: "string" },
        tipo: { type: "string", enum: ["admin", "aluno", "professor"] },
      },
    };
  }

  static get relationMappings() {
    const Treino = require("./Treino");

    return {
      treinos: {
        relation: BaseModel.HasManyRelation,
        modelClass: Treino,
        join: {
          from: "usuarios.id",
          to: "treinos.usuario_id",
        },
      },
    };
  }
}

module.exports = Usuario;
