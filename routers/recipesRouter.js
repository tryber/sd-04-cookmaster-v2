const { Router } = require('express');
const { recipesController } = require('../controller');
const { validateToken } = require('../middlewares/auth');
const { recipeService } = require('../service');

const recipesRouter = Router();

recipesRouter.post(
  '/',
  validateToken,
  recipeService,
  recipesController.createRecipeController,
);

recipesRouter.get('/', recipesController.getAllRecipesController);

module.exports = recipesRouter;
