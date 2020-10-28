const express = require('express');
const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');
const recipeValidation = require('../middlewares/recipeValidation');
const validateToken = require('../auth/validateJWT');

const router = express.Router();

router.get('/', async (_req, res) => {
  const recipes = await recipesModel.getRecipes();

  return res.status(200).json(recipes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const recipe = await recipesModel.getRecipeById(id);

  if (!recipe) {
    res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
});

router.post('/', recipeValidation.requiredFields, validateToken, async (req, res) => {
  const { name, ingredients, preparation, validToken } = req.body;

  const user = await usersModel.findUserByEmail(validToken.email);

  const { _id } = user;

  const recipe = await recipesModel.registerRecipe(name, ingredients, preparation, _id);

  return res.status(201).json({ recipe });
});

module.exports = router;
