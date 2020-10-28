const express = require('express');

const router = express.Router();

const RecipeModel = require('../models/recipeModel');
const recipeValidator = require('../middlewares/recipeValidator');

// const RecipeValidator = require('../middlewares/recipeValidator');

router.get('/recipes', async (req, res) => {
  try {
    const recipes = await RecipeModel.getAllRecipes();

    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json({ errorMessage: 'Something gone wrong on recipeController...' });
  }
});

router.get('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await RecipeModel.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json(recipeValidator.responseMessage('recipe not found'));
    }

    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ errorMessage: 'Something gone wrong on recipeController...' });
  }
});

module.exports = router;
