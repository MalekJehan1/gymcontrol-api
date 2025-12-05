const app = require('./app');
const knex = require('./db');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // test DB connection
    console.log('Conectado ao banco de dados');
  } catch (err) {
    console.error('Erro conectando ao DB:', err);
  }

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

start();
