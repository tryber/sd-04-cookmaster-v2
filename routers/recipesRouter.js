const express = require('express');
const userController = require('../controllers/recipesController');
const validateToken = require('../auth/validateToken');
const middlewares = require('../middlewares/recipes');

const router = express.Router();

const { createRecipeController, listAllRecipes, listOneRecipe } = userController;
const { recipeVerify } = middlewares;

router.post('/', validateToken, recipeVerify, createRecipeController);

router.get('/', listAllRecipes);

router.get('/:id', listOneRecipe);

module.exports = router;
