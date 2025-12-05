const Knex = require('knex');
const { Model } = require('objection');
require('dotenv').config();

const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const knex = Knex(config);

Model.knex(knex);

module.exports = knex;
