const express = require('express');
const bodyParser = require('body-parser');
const pokemonRouter = require('./controllers/pokemonController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());

app.use('/pokemon', pokemonRouter);

app.use(errorHandler);

module.exports = app;