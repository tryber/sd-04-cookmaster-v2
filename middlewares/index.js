const loginVal = require('./loginValidate');
const login = require('./login');
const createUserVal = require('./usersValidate');
const { createUser } = require('./users');
const { createRecipeVal, readRecipeVal, updateOrDeleteRecipeVal } = require('./recipesValidate');
const { createRecipe, readRecipe, readRecipes, updateRecipe, updateImgRecipe, deleteRecipe } = require('./recipes');

module.exports = {
  loginVal,
  login,
  createUserVal,
  createUser,
  createRecipeVal,
  createRecipe,
  readRecipeVal,
  readRecipe,
  readRecipes,
  updateOrDeleteRecipeVal,
  updateRecipe,
  updateImgRecipe,
  deleteRecipe,
};
