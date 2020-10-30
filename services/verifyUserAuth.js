const { NOT_AUTHORIZED } = require('../errors');
const { getById } = require('../models/recipesModel');

const verifyUserAuth = async (recipeId, userInfo) => {
  if (userInfo.role === 'admin') return null;
  const recipe = await getById(recipeId);
  if (recipe.userId !== userInfo.id) throw NOT_AUTHORIZED;
};

module.exports = verifyUserAuth;
