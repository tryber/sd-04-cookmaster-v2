const { recipeModel: { getRecipeById, updateRecipeById } } = require('../models');

const updateRecipe = async (id, userId, role, recipeBody) => {
  const recipe = await getRecipeById(id);

  if (userId === recipe.userId || role === 'admin') {
    await updateRecipeById(id, recipeBody);

    const editedRecipe = await getRecipeById(id);

    return editedRecipe;
  }

  return { message: 'missing auth token' };
};

module.exports = {
  updateRecipe,
};
