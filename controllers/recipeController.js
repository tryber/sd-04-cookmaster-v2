const express = require('express');

const router = express.Router();

const RecipeModel = require('../models/recipeModel');

const recipeValidator = require('../middlewares/recipeValidator');

// const RecipeValidator = require('../middlewares/recipeValidator');

// ROTA PARA PEGAR TODAS AS RECEITAS
router.get('/', async (req, res) => {
  try {
    const recipes = await RecipeModel.getAllRecipes();

    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json({ errorMessage: 'Something gone wrong on recipeController...' });
  }
});

// ROTA PARA PEGAR APENAS UMA RECEITA, USANDO SEU ID
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

// ROTA PARA CRIAR UMA NOVA RECEITA
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

// ROTA PARA DELETAR UMA RECEITA
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipeExist = await RecipeModel.getRecipeById(id);
    if (!recipeExist) {
      return res.status(400).json();
    }
    await RecipeModel.deleteRecipe(id);
    res.status(204).json();
  } catch (err) {
    res.status(400).json(recipeValidator.responseMessage('Invalid entries, Try again.'));
  }
});

// ROTA PARA EDITAR UMA RECEITA
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { name, ingredients, preparation } = req.body;

    const recipeExist = await RecipeModel.getRecipeById(id);

    if (!recipeExist) {
      return res.status(400).json({ message: 'recipe not exists' });
    }

    const newRecipe = {};
    newRecipe.name = name;
    newRecipe.ingredients = ingredients;
    newRecipe.preparation = preparation;

    await RecipeModel.editRecipe(id, name, ingredients, preparation);

    return res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: 'Something gone wrong here' });
  }
});

module.exports = router;
