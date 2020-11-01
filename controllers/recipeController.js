const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const newRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;

  const recipeCreated = await recipeService.newRecipe(name, ingredients, preparation, user);

  if (recipeCreated.message) {
    return res.status(409).json({ message: recipeCreated.message });
  }

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
