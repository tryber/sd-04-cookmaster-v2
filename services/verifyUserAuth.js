const { MISSING_TOKEN } = require('../errors');
const { getById } = require('../models/recipesModel');

const verifyUserAuth = async (recipeId, userInfo) => {
  if (userInfo.role === 'admin') return null;
  const recipe = await getById(recipeId);
  if (recipe.userId !== userInfo.id) throw MISSING_TOKEN;
};

module.exports = verifyUserAuth;
