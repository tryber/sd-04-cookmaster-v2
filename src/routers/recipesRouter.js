const { Router } = require('express');
const { recipesController } = require('../controllers');
const { validateToken } = require('../service');
const { validCreateRecipe } = require('../middlewares');

const recipesRouter = Router();

recipesRouter.post('/', validateToken, validCreateRecipe, recipesController.createRecipeController);

recipesRouter.get('/', recipesController.getAllRecipesController);

recipesRouter.get('/:id', recipesController.getRecipeByIdController);

recipesRouter.put('/:id', validateToken, recipesController.updateRecipeController);

recipesRouter.delete('/:id', validateToken, recipesController.deleteRecipeController);

module.exports = recipesRouter;
