const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const newRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;

  if (!name || !ingredients || !preparation || !user) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const recipeCreated = await recipeService.newRecipe(name, ingredients, preparation, user);

  return res.status(201).json({ recipe: recipeCreated });
});

const getAllRecipes = rescue(async (_req, res) => {
  const recipes = await recipeService.getAllRecipes();
  return res.status(200).json(recipes);
});

const editRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { user } = req;

  const recipe = await recipeService.editRecipe(id, name, ingredients, preparation, user);

  return res.status(200).json(recipe);
});

const findRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.findRecipeById(id);

  if (recipe.message) return res.status(404).json(recipe);

  return res.status(200).json(recipe);
});

const deleteRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  await recipeService.deleteRecipe(id);
  return res.status(204).end();
});

module.exports = {
  newRecipe,
  getAllRecipes,
  editRecipe,
  findRecipeById,
  deleteRecipe,
};
