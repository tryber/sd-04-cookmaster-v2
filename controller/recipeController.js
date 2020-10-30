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

  if (recipe === 'error') return recipeServices.recipeNotFOund(res);

  res.status(200).json(recipe);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipe = await recipeModel.listRecipesById(id);

  if (String(recipe.userId) === String(_id) || req.user.name === 'admin') {
    await recipeModel.updateRecipe(id, name, ingredients, preparation);
    const recipe = await recipeModel.listRecipesById(id);

    console.log(recipe);

    res.status(200).json(recipe);
  }

  res.status(404).json(recipe);
};

module.exports = {
  registerRecipe,
  listRecipes,
  listOneRecipe,
  editRecipe,
};
