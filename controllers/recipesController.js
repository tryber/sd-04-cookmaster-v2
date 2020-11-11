const express = require('express');
const rescue = require('express-rescue');
const { jwtVal } = require('../helpers/jwt');
const { createRecipeVal, createRecipe, readRecipeVal, readRecipe, readRecipes,
  updateOrDeleteRecipeVal, updateRecipe, deleteRecipe } = require('../middlewares');

const router = express.Router();

router.get('/', rescue(readRecipes));
router.post('/', jwtVal, createRecipeVal, rescue(createRecipe));

router.get('/:id', rescue(readRecipeVal), readRecipe);
router.put('/:id', jwtVal, rescue(updateOrDeleteRecipeVal), rescue(updateRecipe));
router.delete('/:id', jwtVal, rescue(updateOrDeleteRecipeVal), rescue(deleteRecipe));

module.exports = router;
