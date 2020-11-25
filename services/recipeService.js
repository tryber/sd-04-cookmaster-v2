const recipeModel = require('../models/recipeModel');

const recipeRegister = async (recipe) => {
  const response = await recipeModel.recipeInsert(recipe);
  return response;
};

module.exports = {
  recipeRegister,
};
