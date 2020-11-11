const express = require('express');
const rescue = require('express-rescue');
const jwt = require('../helpers/jwt');
const { createRecipeVal, createRecipe, readRecipeVal, readRecipe, readRecipes,
  updateRecipeVal, updateRecipe } = require('../middlewares');

const router = express.Router();

router.get('/', rescue(readRecipes));
router.post('/', jwt.val, createRecipeVal, rescue(createRecipe));

router.get('/:id', rescue(readRecipeVal), readRecipe);
router.put('/:id', jwt.val, rescue(updateRecipeVal), rescue(updateRecipe));

module.exports = router;
