const recipeModel = require('../models/genericModel');

const addRecipe = async (req, res) => {
  const recipe = await await recipeModel.createOne('users', req.recipe);
  if (recipe.err) throw create.err;
  res.status(201).json({ recipe: recipe });
};

const allRecipes = async (_req, res) => {
  const recipes = await recipeModel.findAll('recipes');
  if (recipes.err) throw create.err;
  res.status(200).json(recipes);
};

module.exports = { addRecipe, allRecipes };
