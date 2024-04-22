const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache();

const POKEAPI_BASE_URL = process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2';

const getPokemonByNameOrId = async (nameOrId) => {
  const cacheKey = `pokemon_${nameOrId}`;

  // Verificar se os dados estão em cache
  const cachedPokemon = cache.get(cacheKey);
  if (cachedPokemon) {
    console.log('Retornando dados do cache');
    return JSON.parse(cachedPokemon);
  }

  // Se os dados não estiverem em cache, buscar na API e armazenar no cache
  console.log('Buscando dados na API externa...');
  const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${nameOrId}`);
  const pokemon = response.data;

  // Armazenar os dados no cache por 1 hora
  cache.set(cacheKey, JSON.stringify(pokemon), 3600);

  console.log('Dados buscados na API e armazenados em cache');
  return pokemon;
};

module.exports = {
  getPokemonByNameOrId
};