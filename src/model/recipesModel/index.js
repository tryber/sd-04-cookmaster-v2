const createRecipeModel = require('./createRecipe');
const getAllRecipesModel = require('./getAllRecipes');
const getRecipeByIdModel = require('./getRecipeById');
const updateRecipeModel = require('./updateRecipe');
const deleteRecipeModel = require('./deleteRecipe');
const updateWithImageModel = require('./updateWithImage');

module.exports = {
  createRecipeModel,
  getAllRecipesModel,
  getRecipeByIdModel,
  updateRecipeModel,
  deleteRecipeModel,
  updateWithImageModel,
};
