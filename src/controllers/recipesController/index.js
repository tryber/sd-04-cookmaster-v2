const createRecipeController = require('./createRecipe');
const getAllRecipesController = require('./getAllRecipes');
const getRecipeByIdController = require('./getRecipeById');
const updateRecipeController = require('./updateRecipe');
const deleteRecipeController = require('./deleteRecipe');
const updateWithImageController = require('./updateWithImage');

module.exports = {
  createRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeController,
  deleteRecipeController,
  updateWithImageController,
};
