const { Router } = require('express');
const controller = require('../controllers');
const middleware = require('../middleware');

const recipesRouter = Router();

recipesRouter
  .route('/')
  .post(middleware.validateJWT, middleware.validateRecipes, controller.postCreateRecipesCont)
  .get(controller.getAllRecipesCont);

recipesRouter
  .route('/:id')
  .get(controller.getByIdRecipesCont)
  .put(middleware.validateJWT, controller.updateRecipesCont)
  .delete(middleware.validateJWT, controller.deleteRecipesCont);

recipesRouter.put(
  '/:id/image',
  middleware.validateJWT,
  controller.upload.single('image'),
  controller.updateImageRecipesCont,
);

module.exports = recipesRouter;
