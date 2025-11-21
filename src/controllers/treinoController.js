const Treino = require('../models/Treino');
const Exercicio = require('../models/Exercicio');

module.exports = {
  async list(req, res) {
    // lista todos os treinos com exercícios
    const rows = await Treino.query().withGraphFetched('exercicios');
    res.json(rows);
  },

  async get(req, res) {
    const id = req.params.id;
    const treino = await Treino.query().findById(id).withGraphFetched('[exercicios, usuario]');
    if (!treino) return res.status(404).json({ message: 'Treino não encontrado' });
    res.json(treino);
  },

  async create(req, res) {
    const { nome, descricao, usuario_id } = req.body;
    const created = await Treino.query().insert({ nome, descricao, usuario_id });
    res.status(201).json(created);
  },

  async update(req, res) {
    const id = req.params.id;
    const updated = await Treino.query().patchAndFetchById(id, req.body);
    res.json(updated);
  },

  async remove(req, res) {
    await Treino.query().deleteById(req.params.id);
    res.json({ message: 'Removido' });
  },

  // endpoints utilitários para associar exercício <-> treino
  async addExercicio(req, res) {
    const treinoId = req.params.id;
    const { exercicio_id, series, repeticoes, descanso_segundos } = req.body;

    // insere na tabela associativa via knex/objection
    await Treino.relatedQuery('exercicios').for(treinoId).relate({
      id: exercicio_id,
      // quando precisamos incluir propriedades na tabela intermediaria,
      // usamos knex diretamente:
    }).catch(()=>{});

    // atualização manual na tabela associativa:
    const knex = require('../db');
    const existing = await knex('treino_exercicios').where({ treino_id: treinoId, exercicio_id }).first();

    if (existing) {
      await knex('treino_exercicios').where({ treino_id: treinoId, exercicio_id }).update({ series, repeticoes, descanso_segundos });
      return res.json({ message: 'Atualizado' });
    } else {
      const id = await knex('treino_exercicios').insert({ treino_id: treinoId, exercicio_id, series, repeticoes, descanso_segundos }).returning('id');
      return res.status(201).json({ id });
    }
  },

  async removeExercicio(req, res) {
    const treinoId = req.params.id;
    const exercicioId = req.params.exercicioId;
    const knex = require('../db');
    await knex('treino_exercicios').where({ treino_id: treinoId, exercicio_id: exercicioId }).del();
    res.json({ message: 'Removido' });
  }
};
