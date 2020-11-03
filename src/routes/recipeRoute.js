const express = require('express');
const multer = require('multer');
const recipeController = require('../controllers/recipeController');
const tokenAuthorization = require('../middlewares/tokenAuthorization');
const recipeValidation = require('../middlewares/recipeValidation');
const recipeAuthorization = require('../middlewares/recipeAuthorization');
const multerConfig = require('../config/multer');

const router = express.Router();

router.post('/', tokenAuthorization, recipeValidation, recipeController.insertRecipe);

router.get('/', recipeController.listAllRecipes);

router.get('/:id', recipeController.listRecipeById);

router.put('/:id', tokenAuthorization, recipeAuthorization, recipeController.updateRecipe);

router.delete('/:id', tokenAuthorization, recipeAuthorization, recipeController.deleteRecipe);

router.put(
  '/:id/image',
  tokenAuthorization,
  recipeAuthorization,
  multer(multerConfig).single('image'),
  recipeController.insertRecipeImage,
);

module.exports = router;
