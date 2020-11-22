const { cadastro, login, registerAdmin } = require('./userController');
const {
  addRecipe,
  allRecipes,
  recipeById,
  editRecipe,
  deletRecipe,
} = require('./recipesController');

module.exports = {
  cadastro,
  login,
  addRecipe,
  registerAdmin,
  allRecipes,
  recipeById,
  editRecipe,
  deletRecipe,
};
