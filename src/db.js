const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[environment]);

Model.knex(knex);

module.exports = { knex, Model };