const Joi = require('joi');
const { ObjectID } = require('mongodb');
const { INVALID_ENTRIES, RECIPE_NOT_FOUND } = require('../errors');
const { getBy } = require('./genericModel');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
}).unknown(false);

const recipeValidation = (recipe) => {
  const result = recipeSchema.validate(recipe);
  if (result.error) throw INVALID_ENTRIES;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) throw RECIPE_NOT_FOUND;
  const result = await getBy('recipes', '_id', ObjectID(id));
  if (!result) throw RECIPE_NOT_FOUND;
  return result;
};

module.exports = { recipeValidation, getById };
