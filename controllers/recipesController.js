const RecipesModel = require('../models/recipesModel');

// CRIA NOVA RECEITA---------------------------------------------------------------------
const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id: userId } = req.user;

  const err = { message: '' };

  if (!name || !ingredients || !preparation) err.message = 'Invalid entries. Try again.';
  if (err.message.length > 1) {
    return res.status(400).json(err);
  }

  // não me perguntem sobre isso aqui não. Foi a única forma que deu certo, não faço
  // idéia do porquê :)
  const newRecipe = await RecipesModel.createRecipe(name, ingredients, preparation, userId);
  const newRecipeReturn = {
    recipe: { name, ingredients, preparation, userId, _id: newRecipe.insertedId },
  };

  return res.status(201).json(newRecipeReturn);
};

// RETORNA TODAS AS RECEITAS-------------------------------------------------------------------
const allRecipes = async (_req, res) => {
  const recipes = await RecipesModel.getAllRecipes();
  res.status(200).json(recipes);
};

// RETORNA AS RECEITAS POR ID------------------------------------------------------------------
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipesModel.getRecipeById(id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });
  res.status(200).json(recipe);
};

module.exports = { createRecipe, allRecipes, getRecipeById };
