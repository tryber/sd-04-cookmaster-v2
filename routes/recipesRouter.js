const { Router } = require('express');
const controller = require('../controllers/recipesController');
const middleware = require('../middleware/validateRecipes');
const validateJWT = require('../middleware/validateJwt');

const recipesRouter = Router();

recipesRouter
  .route('/')
  .post(validateJWT, middleware.validateRecipes, controller.postCreateRecipesCont)
  .get(controller.getAllRecipesCont);

recipesRouter
  .route('/:id')
  .get(controller.getByIdRecipesCont)
  .put(validateJWT, controller.updateRecipesCont)
  .delete(validateJWT, controller.deleteRecipesCont);

module.exports = recipesRouter;
