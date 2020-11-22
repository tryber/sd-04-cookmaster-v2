const { cadastro, login, registerAdmin } = require('./userController');
const {
  addRecipe,
  allRecipes,
  recipeById,
  editRecipe,
  deletRecipe,
  imageU,
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
  imageU,
};
