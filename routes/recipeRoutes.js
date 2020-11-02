const express = require('express');
const auth = require('../auth');
const { recipeControllers } = require('../controllers');

const routes = express.Router();

// routes.delete('/recipes/:id', recipeControllers.deleteRecipeMiddleware);

routes.get('/recipes/:id', recipeControllers.getASpecificRecipeMiddleware);

routes.get('/recipes', recipeControllers.getRecipesMiddleware);

routes.put('/recipes/:id', auth, recipeControllers.changeRecipeMiddleware);

routes.post('/recipes', auth, recipeControllers.newRecipeMiddleware);


module.exports = routes;
