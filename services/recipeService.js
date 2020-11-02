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

const findRecipeById = async (id) => {
  if (id.length < 24) return { message: 'recipe not found' };

  const recipe = await recipeModel.findRecipeById(id);

  if (!recipe) return { message: 'recipe not found' };

  return recipe;
};

const deleteRecipe = async (id) => {
  await recipeModel.deleteRecipe(id);
};

module.exports = {
  newRecipe,
  getAllRecipes,
  editRecipe,
  findRecipeById,
  deleteRecipe,
};
