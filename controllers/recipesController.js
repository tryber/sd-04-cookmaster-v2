const express = require('express');
const rescue = require('express-rescue');
const jwt = require('../helpers/jwt');
const { createRecipeVal, createRecipe, readRecipeVal, readRecipe
  ,readRecipes } = require('../middlewares');

const router = express.Router();

router.get('/', rescue(readRecipes));
router.post('/', jwt.validate, rescue(createRecipeVal), rescue(createRecipe));

router.get('/:id', rescue(readRecipeVal), rescue(readRecipe));

module.exports = router;
