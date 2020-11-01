const recipeModel = require('../models/recipeModel');

const newRecipe = async (name, ingredients, preparation, user) => {
  if (!name || !ingredients || !preparation || !user) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const { _id: { id } } = user;

  const recipe = await recipeModel.newRecipe(name, ingredients, preparation, id);

  return recipe;
};

const getAllRecipes = async () => recipeModel.getAllRecipes();

module.exports = {
  newRecipe,
  getAllRecipes,
};
