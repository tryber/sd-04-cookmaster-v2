const { getAll, getRecipeById, newRecipeInsert, updateRecipeModel, deleteModel } = require('../models/allModel');

const listRecipes = async (_req, res) => {
  const recipes = await getAll();
  return res.status(200).json(recipes);
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeById(id);
  console.log(recipe)
  if (!recipe) {
    res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
};

const NewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.params;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const recipe = await newRecipeInsert({ name, ingredients, preparation, userId });
  return res.status(201).json(recipe);
};

const editRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;

  const recipe = await updateRecipeModel(id, name, ingredients, preparation);
  return res.status(200).json(recipe);
};

const deleteRecipe = async(req, res) => {
  const { id } = req.params;
  await deleteModel(id);
  return res.status(204).json();
};

module.exports = {
  listRecipes,
  recipeDetails,
  NewRecipe,
  editRecipe,
  deleteRecipe,
};
