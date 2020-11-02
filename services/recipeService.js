const recipeModel = require('../models/recipeModel');

const newRecipe = async (name, ingredients, preparation, user) => {
  const { _id: id } = user;

  const recipe = await recipeModel.newRecipe(name, ingredients, preparation, id);

  return recipe;
};

const getAllRecipes = async () => recipeModel.getAllRecipes();

const editRecipe = async (id, name, ingredients, preparation) => {
  const { userId } = await recipeModel.findRecipeById(id);
  const recipe = await recipeModel.editRecipe(id, name, ingredients, preparation, userId);
  return recipe;
};

module.exports = {
  newRecipe,
  getAllRecipes,
  editRecipe,
};
