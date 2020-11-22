const recipeModel = require('../models/genericModel');
const recipesService = require('../services/recipesService');

const addRecipe = async (req, res) => {
  const { _id: id } = req.user;
  const response = { ...req.recipe, userId: id };
  const recipes = await await recipeModel.createOne('recipes', response);
  if (recipes.err) throw recipes.err;
  res.status(201).json({ recipe: recipes });
};

const allRecipes = async (_req, res) => {
  const recipes = await recipeModel.findAll('recipes');
  if (recipes.err) throw recipes.err;
  res.status(200).json(recipes);
};

const recipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await recipeModel.findById('recipes', id);
    if (recipe) res.status(200).json(recipe);
    res.status(404).json({ message: 'recipe not found' });
  } catch (err) {
    res.status(404).json({ message: 'recipe not found' });
  }
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const updateRecipe = await recipesService.updateAdmOrUser(id, user, req.body);
    if (!updateRecipe) {
      const updateUserR = await recipesService.updateAdmOrUser(id, user, req.body);
      res.status(200).json(updateUserR);
    }
    res.status(200).json(updateRecipe);
  } catch (err) {
    res.status(404).json({ message: 'recipe not found' });
  }
};

const deletRecipe = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const deleteRecipeA = await recipesService.deleteAdmOrUser(id, user);
    if (!deleteRecipeA) {
      const deleteRecipeU = await recipesService.deleteAdmOrUser(id, user);
      res.status(204).json(deleteRecipeU);
    }
    res.status(204).json(deleteRecipeA);
  } catch (err) {
    res.status(404).json({ message: 'recipe not found' });
  }
};

const imageU = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  const user = await recipeModel.findOne('users', { email });

  if (user) {
    const result = await recipeModel.addImage(id);
    if (result) {
      const recipeUpdatedWithImage = await recipeModel.findById('recipes', id);
      return res.status(200).json(recipeUpdatedWithImage);
    }
  }
};

module.exports = { addRecipe, allRecipes, recipeById, editRecipe, deletRecipe, imageU };
