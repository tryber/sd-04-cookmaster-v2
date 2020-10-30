const { Router } = require('express');
const { recipesController } = require('../controllers');
const { validateToken, uploadImage } = require('../service');
const { validCreateRecipe } = require('../middlewares');

const recipesRouter = Router();

recipesRouter.post('/', validateToken, validCreateRecipe, recipesController.createRecipeController);

recipesRouter.get('/', recipesController.getAllRecipesController);

recipesRouter.put(
  '/:id/image/',
  validateToken,
  uploadImage,
  recipesController.updateWithImageController,
);

recipesRouter.get('/:id', recipesController.getRecipeByIdController);

recipesRouter.put('/:id', validateToken, recipesController.updateRecipeController);

recipesRouter.delete('/:id', validateToken, recipesController.deleteRecipeController);

module.exports = recipesRouter;
