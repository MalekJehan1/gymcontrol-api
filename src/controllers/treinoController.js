const Treino = require("../models/Treino");
const Exercicio = require("../models/Exercicio");
const Professor = require("../models/Professor");
const Aluno = require("../models/Aluno");

module.exports = {
  async list(req, res) {
    const rows = await Treino.query()
      .withGraphFetched("[exercicios, professor.usuario, aluno.usuario]")
      .orderBy("id", "descricao");
    res.json(rows);
  },

  async listMeusTreinos(req, res) {
    console.log("Listando treinos do aluno logado request.user:", req.user);
    try {
      const usuarioId = req.user.usuario.id;

      const aluno = await require("../models/Aluno")
        .query()
        .findOne({ usuario_id: usuarioId });

      if (!aluno) {
        return res
          .status(404)
          .json({ error: "Nenhum aluno encontrado para este usuário" });
      }

      const treinos = await Treino.query()
        .where("aluno_id", aluno.id)
        .withGraphFetched("[exercicios, professor.usuario, aluno.usuario]");

      console.log("Treinos encontrados para o aluno:", treinos);

      res.json(treinos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar treinos do aluno" });
    }
  },

  async get(req, res) {
    const id = req.params;
    console.log("ID do treino solicitado:", id);
    const treino = await Treino.query()
      .findById(id)
      .withGraphFetched("[exercicios, usuario]");
    if (!treino)
      return res.status(404).json({ message: "Treino não encontrado" });
    res.json(treino);
  },

  async create(req, res) {
    try {
      const { nome, descricao, aluno_id, professor_id, exercicios } = req.body;

      if (!aluno_id || !professor_id) {
        return res.status(400).json({
          message: "Aluno e professor devem ser informados",
        });
      }

      const created = await Treino.query().insert({
        nome,
        descricao,
        aluno_id,
        professor_id,
      });

      // Inserir exercícios
      if (Array.isArray(exercicios) && exercicios.length > 0) {
        const knex = require("../db");

        const inserts = exercicios.map((ex) => ({
          treino_id: created.id,
          exercicio_id: ex.id,
          series: ex.series || 0,
          repeticoes: ex.repeticoes || 0,
          descanso_segundos: ex.descanso_segundos || 0,
        }));

        await knex("treino_exercicios").insert(inserts);
      }

      const treinoCompleto = await Treino.query()
        .findById(created.id)
        .withGraphFetched("[exercicios]");

      return res.status(201).json(treinoCompleto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao criar treino" });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { nome, descricao, aluno_id, professor_id, exercicios } = req.body;

      if (!aluno_id || !professor_id) {
        return res.status(400).json({
          message: "Aluno e professor devem ser informados",
        });
      }

      await Treino.query()
        .patch({
          nome,
          descricao,
          aluno_id,
          professor_id,
        })
        .where("id", id);

      // Atualizar exercícios
      const knex = require("../db");
      await knex("treino_exercicios").where({ treino_id: id }).del();

      if (Array.isArray(exercicios) && exercicios.length > 0) {
        const inserts = exercicios.map((ex) => ({
          treino_id: id,
          exercicio_id: ex.id,
          series: ex.series || 0,
          repeticoes: ex.repeticoes || 0,
          descanso_segundos: ex.descanso_segundos || 0,
        }));

        await knex("treino_exercicios").insert(inserts);
      }

      const treinoAtualizado = await Treino.query()
        .findById(id)
        .withGraphFetched("[exercicios]");

      res.json(treinoAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar treino" });
    }
  },

  async remove(req, res) {
    await Treino.query().deleteById(req.params.id);
    res.json({ message: "Removido" });
  },

  // async removeExercicio(req, res) {
  //   const treino_id = req.params.id;
  //   const exercicio_id = req.params.exercicioId;

  //   const knex = require("../db");

  //   await knex("treino_exercicios").where({ treino_id, exercicio_id }).del();

  //   return res.json({ message: "Exercício removido do treino" });
  // },
};
