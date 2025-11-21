const Knex = require('knex');
const { Model } = require('objection');
require('dotenv').config();

const knexConfig = require('../knexfile.js');
const knex = Knex(knexConfig.development);

Model.knex(knex);

module.exports = knex;
