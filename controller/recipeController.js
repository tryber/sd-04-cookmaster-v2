const recipeServices = require('../services//userServices');
const recipeModel = require('../models/recipeModel');

const registerRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  if (!name || !ingredients || !preparation) return recipeServices.invalideEntries(res);

  const recipe = await recipeModel.registerRecipe(name, ingredients, preparation, _id);
  res.status(201).json({ recipe });
};

const listRecipes = async (_, res) => {
  const recipe = await recipeModel.listRecipesModel();

  res.status(200).json(recipe);
};

const listOneRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.listRecipesById(id);

  console.log(recipe);
  if (recipe === 'error') return recipeServices.recipeNotFOund(res);

  res.status(200).json(recipe);
};

module.exports = {
  registerRecipe,
  listRecipes,
  listOneRecipe,
};
