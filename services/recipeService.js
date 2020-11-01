const recipeModel = require('../models/recipeModel');

const newRecipe = async (name, ingredients, preparation, user) => {
  const { _id: id } = user;

  const recipe = await recipeModel.newRecipe(name, ingredients, preparation, id);

  return recipe;
};

const getAllRecipes = async () => recipeModel.getAllRecipes();

module.exports = {
  newRecipe,
  getAllRecipes,
};
