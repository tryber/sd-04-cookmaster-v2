const express = require('express');

const auth = require('../middlewares/auth');

const { createRecipe, getAllRecipes, getRecipeById } = require('../models/recipesModel');

const {
  recipeDataValidationMiddleware,
  recipeValidationMiddleware,
} = require('../services/recipesService');

const router = express.Router();

router.post('/', auth, recipeDataValidationMiddleware, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const user = req.user;
  console.log(user);
  const recipe = await createRecipe(name, ingredients, preparation, user.id);

  res.status(201).json({ recipe });
});

router.get('/', async (req, res) => {
  const allRecipes = await getAllRecipes();
  res.status(200).json(allRecipes);
});

router.get('/:id', recipeValidationMiddleware, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  console.log(recipe);
  return res.status(200).json(recipe);
});

module.exports = router;
