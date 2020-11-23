const { recipeModel: { getRecipeById, updateRecipeById } } = require('../models');

const updateRecipe = async (id, userId, role, name, ingredients, preparation) => {
  const recipe = await getRecipeById(id);

  if (userId === recipe.userId || role === 'admin') {
    await updateRecipeById(id, name, ingredients, preparation);

    const editedRecipe = await getRecipeById(id);

    return editedRecipe;
  }

  return { message: 'missing auth token' };
};

module.exports = {
  updateRecipe,
};
