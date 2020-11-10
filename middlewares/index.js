const loginVal = require('./loginValidate');
const login = require('./login');
const createUserVal = require('./usersValidate');
const { createUser } = require('./users');
const createRecipeVal = require('./recipesValidate');
const { createRecipe, readRecipes } = require('./recipes');

module.exports = {
  loginVal,
  login,
  createUserVal,
  createUser,
  createRecipeVal,
  createRecipe,
  readRecipes,
};
