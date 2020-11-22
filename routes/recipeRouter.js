const { Router } = require('express');
const { recipeController: { createRecipeController, getAllRecipesController } } = require('../controllers');
const { userMiddlewares: { validateName },
  recipeMiddlewares: { validateIngredients, validatePreparation },
  tokenAuth,
} = require('../middlewares');
const { INVALID_ENTRIES } = require('../utils/errorTypes');

const recipesRouter = Router();

recipesRouter.post('/',
  tokenAuth,
  validateName(400, INVALID_ENTRIES),
  validateIngredients(400, INVALID_ENTRIES),
  validatePreparation(400, INVALID_ENTRIES),
  createRecipeController);

recipesRouter.get('/', getAllRecipesController);

module.exports = recipesRouter;
