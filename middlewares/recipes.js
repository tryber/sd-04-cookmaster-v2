const recipesModel = require('../models/recipesModel');
const resp = require('../errorMsgs');

const createRecipe = async (req, res) => {
  const userId = req.id;
  const recipe = await recipesModel.create(req.body, userId);

  resp(res, 201, null, { recipe });
};

const readRecipe = async (req, res) => {
  const recipe = req.recipe;

  resp(res, 200, null, recipe);
};

const readRecipes = async (_, res) => {
  const recipes = await recipesModel.read();

  resp(res, 200, null, recipes);
};

module.exports = {
  createRecipe,
  readRecipe,
  readRecipes,
};
