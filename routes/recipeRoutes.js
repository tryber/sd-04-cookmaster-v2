const express = require('express');
const auth = require('../auth');
const { recipeControllers } = require('../controllers');

const routes = express.Router();

routes.delete('/recipes/:id', auth, recipeControllers.deleteRecipeMiddleware);

routes.get('/recipes/:id', recipeControllers.getASpecificRecipeMiddleware);

routes.get('/recipes', recipeControllers.getRecipesMiddleware);

routes.post('/recipes', auth, recipeControllers.newRecipeMiddleware);

routes.put('/recipes/:id/image', auth, recipeControllers.newRecipeMiddleware);

routes.put('/recipes/:id', auth, recipeControllers.changeRecipeMiddleware);

module.exports = routes;
