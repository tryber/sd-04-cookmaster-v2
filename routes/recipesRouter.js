const { Router } = require('express');
const { recipesController } = require('../controllers');
const middleware = require('../middleware');

const recipesRouter = Router();

recipesRouter
  .route('/')
  .post(middleware.validateJWT, middleware.validateRecipes, recipesController.postCreateRecipesCont)
  .get(recipesController.getAllRecipesCont);

recipesRouter
  .route('/:id')
  .get(recipesController.getByIdRecipesCont)
  .put(middleware.validateJWT, recipesController.updateRecipesCont)
  .delete(middleware.validateJWT, recipesController.deleteRecipesCont);

recipesRouter.put(
  '/:id/image',
  middleware.validateJWT,
  recipesController.upload.single('image'),
  recipesController.updateImageRecipesCont,
);

module.exports = recipesRouter;
