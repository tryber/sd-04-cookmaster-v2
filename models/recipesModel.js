const Joi = require('joi');
const { INVALID_ENTRIES } = require('../errors');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
}).unknown(false);

const recipeValidation = (recipe) => {
  const result = recipeSchema.validate(recipe);
  if (result.error) throw INVALID_ENTRIES;
};

module.exports = { recipeValidation };
