const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pokemonRouter = require('./controllers/pokemonController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Lista de domínios permitidos
const allowedOrigins = ['http://localhost:3000', 'https://api-pokedex-koelho.vercel.app'];

// Configuração do CORS com lista de domínios permitidos
const corsOptions = {
  origin: function (origin, callback) {
    // Verifica se a origem da solicitação está na lista de domínios permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/pokemon', pokemonRouter);

app.use(errorHandler);

module.exports = app;