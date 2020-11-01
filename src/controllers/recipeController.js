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

const listRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.listRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal error' });
  }
};

module.exports = {
  insertRecipe,
  listRecipes,
};
