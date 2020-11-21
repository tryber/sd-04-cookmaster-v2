const { cadastro, login } = require('./userController');
const { addRecipe, allRecipes, recipeById, editRecipe } = require('./recipesController');

module.exports = { cadastro, login, addRecipe, allRecipes, recipeById, editRecipe };
