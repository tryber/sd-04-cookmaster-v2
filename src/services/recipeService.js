const recipeModel = require('../models/recipeModel');
const { ERR_INVALID_USER, ERR_NOT_AN_ADMIN } = require('../utils/errorTypes');

const updateRecipe = async (recipeId, tokenUserId, userRole, recipe) => {
  const { name, ingredients, preparation } = recipe;
  const recipeToUpdate = await recipeModel.listRecipeById(recipeId);

  if (recipeToUpdate.userId.toString() !== tokenUserId.toString() && userRole === 'user') {
    throw new Error(ERR_INVALID_USER);
  }

  if (recipeToUpdate.userId.toString() !== tokenUserId.toString() && userRole !== 'admin') {
    throw new Error(ERR_NOT_AN_ADMIN);
  }

  const updatedRecipe = await recipeModel.updateRecipe(recipeId, name, ingredients, preparation);

  return updatedRecipe.value;
};

module.exports = {
  updateRecipe,
};
