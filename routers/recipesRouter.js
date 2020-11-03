const express = require('express');
const recipeController = require('../controllers/recipesController');
const validateToken = require('../auth/validateToken');
const middlewares = require('../middlewares/recipes');

const router = express.Router();

const {
  createRecipeController,
  listAllRecipes,
  listOneRecipe,
  editRecipe,
  deleteRecipe,
} = recipeController;
const { recipeVerify } = middlewares;

router.post('/', validateToken, recipeVerify, createRecipeController);

router.get('/', listAllRecipes);

router.get('/:id', listOneRecipe);

router.put('/:id', validateToken, editRecipe);

router.delete('/:id', validateToken, deleteRecipe);

module.exports = router;
