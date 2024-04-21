const Joi = require('joi');

const validatePokemonNameOrId = (req, res, next) => {
  const schema = Joi.object({
    nameOrId: Joi.string().alphanum().required()
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = {
  validatePokemonNameOrId
};