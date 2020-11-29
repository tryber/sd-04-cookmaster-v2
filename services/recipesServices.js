const { recipesModel } = require('../models');

const createRecipe = async (recipe) => {
  const createdRecipe = await recipesModel.createRecipe(recipe);

  return createdRecipe;
};

const findAllRecipes = async () => {
  const recipes = await recipesModel.findAllRecipes();

  return recipes;
};

const recipeById = async (id) => {
  const recipe = await recipesModel.recipeById(id);

  return recipe;
};

const editRecipe = async (recipe) => {
  const { userId } = await recipesModel.recipeById(recipe.id);
  const updatedRecipe = await recipesModel.editRecipe({ ...recipe, userId });

  if (!updatedRecipe) {
    return;
  }

  return updatedRecipe;
};

const deleteRecipe = async ({ recipeId, idLoged }) => {
  const { userId: recipeCreator } = await recipesModel.recipeById(recipeId);

  if (idLoged !== recipeCreator) {
    return;
  }

  const deletedRecipe = await recipesModel.deleteRecipe(recipeId);
  return deletedRecipe;
};

const editImage = async ({ id, filename }) => {
  const imagePath = `localhost:3000/images/${filename}`;
  const recipeWithoutImage = await recipesModel.recipeById(id);

  if (!recipeWithoutImage) {
    return;
  }

  const addedImage = await recipesModel.editImage({ id, imagePath }, recipeWithoutImage);
  return addedImage;
};

module.exports = {
  editRecipe,
  createRecipe,
  deleteRecipe,
  findAllRecipes,
  recipeById,
  editImage,
};
