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

// ATUALIZA UMA RECEITA -------------------------------------------------------------------------
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  await RecipesModel.updateRecipe(id, name, ingredients, preparation);

  const updatedRecipe = await RecipesModel.getRecipeById(id);

  res.status(200).json(updatedRecipe);
};

// DELETA UMA RECEITA -------------------------------------------------------------------------
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  await RecipesModel.deleteRecipe(id);
  return res.status(204).send();
};

// ADICIONAR FOTO NA RECEITA -------------------------------------------------------------------
const uploadPhoto = async (req, res) => {
  const { id } = req.params;
  const photo = `localhost:3000/images/${id}.jpeg`;

  await RecipesModel.addPhoto(id, photo);

  const recipeWithPhoto = await RecipesModel.getRecipeById(id);
  console.log(recipeWithPhoto);
  return res.status(200).json(recipeWithPhoto);
};

module.exports = {
  createRecipe,
  allRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadPhoto,
};
