const { Model } = require("objection");
const Usuario = require("./Usuario");

class Professor extends Model {
  static get tableName() {
    return "professores";
  }

  static get relationMappings() {
    return {
      usuario: {
        relation: Model.BelongsToOneRelation,
        modelClass: Usuario,
        join: {
          from: "professores.usuario_id",
          to: "usuarios.id",
        },
      },
    };
  }
}

module.exports = Professor;
