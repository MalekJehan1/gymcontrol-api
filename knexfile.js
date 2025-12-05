require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    }
  },

  production: {
    client: "pg",
    connection: `${process.env.DATABASE_URL}?sslmode=require`,
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    }
  }
};
