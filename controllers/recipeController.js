const express = require('express');

const router = express.Router();

const tokenValidator = require('../authentication/tokenValidator');

const RecipeModel = require('../models/recipeModel');
const UserModel = require('../models/userModel');

const recipeValidator = require('../middlewares/recipeValidator');

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
    res.status(404).json(recipeValidator.responseMessage('recipe not found'));
  }
});

// ROTA PARA CRIAR UMA NOVA RECEITA
router.post('/', recipeValidator.validateCreateRecipe, tokenValidator, async (req, res) => {
  try {
    const { name, ingredients, preparation, tokenValid } = req.body;

    const user = await UserModel.getUserByEmail(tokenValid.email);

    console.log(('linha 49 recipeController', tokenValid, user));

    // const { _id } = user;

    console.log('linha 57, recipeController, req.body', req.body);

    const recipe = await RecipeModel.registerRecipe(name, ingredients, preparation);

    res.status(201).json({ recipe: recipe.ops[0] });
  } catch (err) {
    console.log('aqui está o erro: ', err);
    res.status(400).json(recipeValidator.responseMessage('Invalid entries. Try again.'));
  }
});

// ROTA PARA DELETAR UMA RECEITA
router.delete('/:id', tokenValidator, async (req, res) => {
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
router.put('/:id', tokenValidator, async (req, res) => {
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
