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

module.exports = {
  newRecipe,
  getAllRecipes,
};
