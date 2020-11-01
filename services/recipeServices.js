const validation = require('../utils/validation');
const Recipe = require('../models/Recipe');

const getRecipeById = async ({ id }) => {
  const recipe = await Recipe.getRecipeById(id);
  if (!recipe) {
    return validation.errMessage(validation.RECIPE_NOT_FOUND);
  }
  return recipe;
};

const insertNewRecipe = async ({ name, ingredients, preparation }, { _id }) => {
  if (validation.isFieldsInvalid(name, ingredients, preparation)) {
    return validation.errMessage(validation.ENTRIES_MESSAGE);
  }
  const insertResponse = await Recipe.insertNewRecipe({ name, ingredients, preparation }, _id);
  return insertResponse;
};

const listService = async () => Recipe.listAllRecipes();

module.exports = {
  getRecipeById,
  insertNewRecipe,
  listService,
};
