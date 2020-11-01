const express = require('express');
const auth = require('../auth');
const { recipeControllers } = require('../controllers');

const routes = express.Router();

routes.post('/recipes', auth, recipeControllers.newRecipeMiddleware);

module.exports = routes;
