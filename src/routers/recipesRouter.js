const { Router } = require('express');
const { recipesController } = require('../controllers');
const { validateToken } = require('../service');
const { validCreateRecipe } = require('../middlewares');

const recipesRouter = Router();

recipesRouter.post('/', validateToken, validCreateRecipe, recipesController.createRecipeController);

module.exports = recipesRouter;
