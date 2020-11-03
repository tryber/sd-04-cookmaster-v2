const recipesModel = require('../models/recipesModel');

const createRecipeController = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    if (req.user) {
      const { _id } = req.user;
      const create = await recipesModel.createRecipe(name, ingredients, preparation, _id);
      res.status(201).json({ recipe: create });
    }
  } catch (error) {
    console.log(error);
  }
};

const listAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
  }
};

const listOneRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesModel.getById(id);
    if (!recipe) return res.status(404).json({ message: 'recipe not found' });

    return res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
  }
};

const editRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const userId = req.user._id;
    await recipesModel.editRecipe(id, name, ingredients, preparation, userId);
    const recipe = await recipesModel.getById(id);
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRecipeController,
  listAllRecipes,
  listOneRecipe,
  editRecipe,
};
