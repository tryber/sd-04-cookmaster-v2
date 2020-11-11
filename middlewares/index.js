const loginVal = require('./loginValidate');
const login = require('./login');
const createUserVal = require('./usersValidate');
const { createUser } = require('./users');
const { createRecipeVal, readRecipeVal, updateRecipeVal } = require('./recipesValidate');
const { createRecipe, readRecipe, readRecipes, updateRecipe } = require('./recipes');

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
  updateRecipeVal,
  updateRecipe,
};
