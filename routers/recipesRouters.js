const express = require('express');
const recipeController = require('../controllers/recipeController');
const recipeMiddleware = require('../middleware/recipeValidate');
const authMiddleware = require('../middleware/userAuthentication');

const router = express.Router();

router.get('/', recipeController.getRecipe);
router.get('/:id', recipeController.getRecipeById);
router.post(
  '/',
  authMiddleware.validaJWT,
  recipeMiddleware.validaReceita,
  recipeController.adicionarReceita,
);
router.put('/:id', authMiddleware.validaJWT, recipeController.updateRecipe);

router.delete('/:id', authMiddleware.validaJWT, recipeController.deleteRecipe);

module.exports = router;
