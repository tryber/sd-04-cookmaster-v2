const { Router } = require('express');
const { recipeController: {
  createRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeByIdController,
  deleteRecipeByIdController,
  insertImageController,
} } = require('../controllers');
const { userMiddlewares: { validateName },
  recipeMiddlewares: { validateIngredients, validatePreparation },
  tokenAuth,
} = require('../middlewares');
const { INVALID_ENTRIES } = require('../utils/errorTypes');
const upload = require('../config/multer');

const recipesRouter = Router();

recipesRouter.post('/',
  tokenAuth,
  validateName(400, INVALID_ENTRIES),
  validateIngredients(400, INVALID_ENTRIES),
  validatePreparation(400, INVALID_ENTRIES),
  createRecipeController);

recipesRouter.get('/', getAllRecipesController);

recipesRouter.get('/:id', getRecipeByIdController);

recipesRouter.put('/:id', tokenAuth, updateRecipeByIdController);

recipesRouter.delete('/:id', tokenAuth, deleteRecipeByIdController);

recipesRouter.put('/:id/image', tokenAuth, upload.single('image'), insertImageController);

module.exports = recipesRouter;
