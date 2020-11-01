const express = require('express');
const auth = require('../auth');
const { recipeControllers } = require('../controllers');

const routes = express.Router();

routes.get('/recipes/:id', recipeControllers.getASpecificRecipe);

routes.get('/recipes', recipeControllers.getRecipesMiddleware);

routes.post('/recipes', auth, recipeControllers.newRecipeMiddleware);

module.exports = routes;
