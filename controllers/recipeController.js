const express = require('express');
const validateJwt = require('../middleware/validateJWT');
const { recipeErrorDealer } = require('../middleware/validateInfo');
const imageDealer = require('../middleware/imageDealer');
const RecipeModel = require('../models/recipeModel');

const router = express.Router();

router.post('/', validateJwt, recipeErrorDealer, async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipeRegistered = await RecipeModel.createRecipe(name, ingredients, preparation, _id);
  res.status(201).json({ recipe: recipeRegistered });
});

router.get('/', async (req, res) => {
  const recipes = await RecipeModel.getAllRecipes();
  res.status(200).json(recipes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeModel.getRecipeById(id);
  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  res.status(200).json(recipe);
});

router.put('/:id', validateJwt, recipeErrorDealer, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  await RecipeModel.updateRecipe(id, name, ingredients, preparation);
  const updatedRecipe = await RecipeModel.getRecipeById(id);

  res.status(200).json(updatedRecipe);
});

router.delete('/:id', validateJwt, async (req, res) => {
  const { id } = req.params;
  await RecipeModel.deleteRecipe(id);
  res.status(204).json();
});

router.put('/:id/image', validateJwt, imageDealer, async (req, res) => {
  try {
    const { id } = req.params;
    await RecipeModel.updateRecipeWithImage(id, `localhost:3000/images/${id}.jpeg`);
    const recipe = await RecipeModel.getRecipeById(id);
    res.status(200).json(recipe);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
