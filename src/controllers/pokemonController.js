const express = require('express');
const router = express.Router();
const pokeapiService = require('../services/pokeapiService');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get('/:nameOrId', validationMiddleware.validatePokemonNameOrId, async (req, res, next) => {
  try {
    const { nameOrId } = req.params;
    const pokemon = await pokeapiService.getPokemonByNameOrId(nameOrId);
    res.json(pokemon);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
