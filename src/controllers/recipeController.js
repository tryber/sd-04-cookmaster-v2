const recipeModel = require('../models/recipeModel');

const insertRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const insertedRecipe = await recipeModel.insertRecipe(name, ingredients, preparation, _id);

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

const updateRecipe = async (req, res) => {
  try {
    const { id: recipeId } = req.params;
    const recipeInfo = req.body;

    const updatedRecipe = await recipeModel.updateRecipe(recipeId, recipeInfo);

    return res.status(200).json(updatedRecipe.value);
  } catch (err) {
    res.status(500).json({ message: 'internal error' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id: recipeId } = req.params;
    await recipeModel.deleteRecipe(recipeId);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'internal error' });
  }
};

const insertRecipeImage = async (req, res) => {
  const { id: recipeId } = req.params;
  const { filename: imageFileName } = req.file;
  const updatedRecipe = await recipeModel.updateRecipe(recipeId, {
    image: `localhost:3000/images/${imageFileName}`,
  });
  res.status(200).json(updatedRecipe.value);
};

module.exports = {
  insertRecipe,
  listAllRecipes,
  listRecipeById,
  updateRecipe,
  deleteRecipe,
  insertRecipeImage,
};
