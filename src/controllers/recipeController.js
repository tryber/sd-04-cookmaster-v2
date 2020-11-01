const recipeModel = require('../models/recipeModel');

const insertRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const insertedRecipe = await recipeModel.insertRecipe(name, ingredients, preparation);

    res.status(201).json({ recipe: insertedRecipe });
  } catch (_err) {
    res.status(500).json({ message: 'internal error' });
  }
};

const listAllRecipes = async (_req, res) => {
  try {
    const recipes = await recipeModel.listAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'internal error' });
  }
};

const listRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeModel.listRecipeById(id);
    res.status(200).json(recipe);
  } catch (_err) {
    res.status(404).json({ message: 'recipe not found' });
  }
};

module.exports = {
  insertRecipe,
  listAllRecipes,
  listRecipeById,
};
