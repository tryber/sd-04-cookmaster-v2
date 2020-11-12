const recipesModel = require('../models/recipesModel');
const resp = require('../errorMsgs');

const createRecipe = async (req, res) => {
  const userId = req.id;
  const recipe = await recipesModel.create(req.body, userId);

  resp(res, 201, null, { recipe });
};

const readRecipe = (req, res) => {
  const recipe = req.recipe;

  resp(res, 200, null, recipe);
};

const readRecipes = async (_, res) => {
  const recipes = await recipesModel.read();

  resp(res, 200, null, recipes);
};

const updateRecipe = async (req, res) => {
  const id = req.params.id;
  const recipe = await recipesModel.update(req.body, id);

  resp(res, 200, null, recipe);
};

const updateImgRecipe = async (req, res) => {
  const id = req.params.id;
  const filename = req.file.filename;
  const url = `localhost:3000/images/${filename}`;
  const recipe = await recipesModel.update({}, id, url);

  resp(res, 200, null, recipe);
};

const deleteRecipe = async (req, res) => {
  const id = req.params.id;

  await recipesModel.del(id);

  resp(res, 204, null, '');
};

module.exports = {
  createRecipe,
  readRecipe,
  readRecipes,
  updateRecipe,
  updateImgRecipe,
  deleteRecipe,
};
