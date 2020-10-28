const express = require('express');

const router = express.Router();

const RecipeModel = require('../models/recipeModel');

const recipeValidator = require('../middlewares/recipeValidator');

// const RecipeValidator = require('../middlewares/recipeValidator');

router.get('/', async (req, res) => {
  try {
    const recipes = await RecipeModel.getAllRecipes();

    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json({ errorMessage: 'Something gone wrong on recipeController...' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await RecipeModel.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json(recipeValidator.responseMessage('recipe not found'));
    }

    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json(recipeValidator.responseMessage('recipe not found'));
  }
});

// criação da rota /recipes onde é possível cadastrar uma nova receita
router.post('/', async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;

    console.log('linha 42', name);

    if (!name || !ingredients || !preparation) {
      return res.status(400).json(recipeValidator.responseMessage('Invalid entries. Try again.'));
    }

    console.log('linha 48', ingredients);

    const recipe = await RecipeModel.registerRecipe(name, ingredients, preparation);

    res.status(201).json({ recipe: recipe.ops[0] });
  } catch (err) {
    res.status(400).json(recipeValidator.responseMessage('Invalid entries, Try again.'));
  }
});

module.exports = router;
