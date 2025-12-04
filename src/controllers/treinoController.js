const Treino = require("../models/Treino");
const Exercicio = require("../models/Exercicio");

module.exports = {
  async list(req, res) {
    // lista todos os treinos com exercícios
    const rows = await Treino.query().withGraphFetched("exercicios");
    res.json(rows);
  },

  async listMeusTreinos(req, res) {
    try {
      const usuarioId = req.user.usuario.id;

      // Buscar o aluno vinculado ao usuário
      const aluno = await require("../models/Aluno")
        .query()
        .findOne({ usuario_id: usuarioId });

      if (!aluno) {
        return res
          .status(404)
          .json({ error: "Nenhum aluno encontrado para este usuário" });
      }

      const treinos = await Treino.query()
        .join("aluno_treinos", "treinos.id", "aluno_treinos.treino_id")
        .where("aluno_treinos.aluno_id", aluno.id)
        .andWhere("aluno_treinos.ativo", true)
        .select("treinos.*")
        .withGraphFetched("exercicios");

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
    const { nome, descricao, usuario_id } = req.body;
    const created = await Treino.query().insert({
      nome,
      descricao,
      usuario_id,
    });
    res.status(201).json(created);
  },

  async update(req, res) {
    const id = req.params.id;
    let data = { ...req.body };

    //  Remover exerciciosIds para NÃO tentar salvar na tabela treinos
    const exerciciosIds = data.exerciciosIds;
    delete data.exerciciosIds;

    await Treino.query().patch(data).where("id", id);

    if (Array.isArray(exerciciosIds)) {
      const knex = require("../db");

      await knex("treino_exercicios").where({ treino_id: id }).del();

      for (const exId of exerciciosIds) {
        await knex("treino_exercicios").insert({
          treino_id: id,
          exercicio_id: exId,
          series: 0,
          repeticoes: 0,
          descanso_segundos: 0,
        });
      }
    }

    res.json({ message: "Treino atualizado com sucesso" });
  },

  async remove(req, res) {
    await Treino.query().deleteById(req.params.id);
    res.json({ message: "Removido" });
  },

  // endpoints utilitários para associar exercício <-> treino
  async addExercicio(req, res) {
    const treinoId = req.params.id;
    const { exercicio_id, series, repeticoes, descanso_segundos } = req.body;

    // insere na tabela associativa via knex/objection
    await Treino.relatedQuery("exercicios")
      .for(treinoId)
      .relate({
        id: exercicio_id,
        // quando precisamos incluir propriedades na tabela intermediaria,
        // usamos knex diretamente:
      })
      .catch(() => {});

    // atualização manual na tabela associativa:
    const knex = require("../db");
    const existing = await knex("treino_exercicios")
      .where({ treino_id: treinoId, exercicio_id })
      .first();

    if (existing) {
      await knex("treino_exercicios")
        .where({ treino_id: treinoId, exercicio_id })
        .update({ series, repeticoes, descanso_segundos });
      return res.json({ message: "Atualizado" });
    } else {
      const id = await knex("treino_exercicios")
        .insert({
          treino_id: treinoId,
          exercicio_id,
          series,
          repeticoes,
          descanso_segundos,
        })
        .returning("id");
      return res.status(201).json({ id });
    }
  },

  async removeExercicio(req, res) {
    const treinoId = req.params.id;
    const exercicioId = req.params.exercicioId;
    console.log("Removendo exercício", exercicioId, "do treino", treinoId);
    const knex = require("../db");
    await knex("treino_exercicios")
      .where({ treino_id: treinoId, exercicio_id: exercicioId })
      .del();
    res.json({ message: "Removido" });
  },
};
