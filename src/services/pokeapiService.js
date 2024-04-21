const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache();

const POKEAPI_BASE_URL = process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2/';

const getPokemonByNameOrId = async (nameOrId) => {
  const cacheKey = `pokemon_${nameOrId}`;
  const cachedPokemon = cache.get(cacheKey);

  if (cachedPokemon) {
    return cachedPokemon;
  }

  const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${nameOrId}`);
  const pokemon = response.data;

  cache.set(cacheKey, pokemon, 3600); // Cache for 1 hour
  return pokemon;
};

module.exports = {
  getPokemonByNameOrId
};