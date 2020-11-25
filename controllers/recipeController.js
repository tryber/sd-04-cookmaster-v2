const Boom = require('@hapi/boom');
const recipeModel = require('../models/recipeModel');

const recipeRegister = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  if (!name || !ingredients || !preparation) return next(Boom.badRequest('Invalid entries. Try again.'));

  const response = await recipeModel.recipeInsert({
    name,
    ingredients,
    preparation,
    userId: _id,
  });

  res.status(201).json({ recipe: response });
};

const recipeList = async (_req, res) => {
  const response = await recipeModel.findRecipeList();

  res.status(200).json(response);
};

const recipeDetail = async (req, res, next) => {
  try {
    const response = await recipeModel.findRecipeById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    return next(Boom.notFound('recipe not found'));
  }
};

const recipeEdit = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const response = await recipeModel.editRecipe(req.params.id, name, ingredients, preparation);

  res.status(200).json(response);
};

const recipeDelete = async (req, res) => {
  await recipeModel.deleteRecipe(req.params.id);
  res.status(204).send();
};

const recipeImage = async (req, res) => {
  const { filename } = req.file;
  const url = `localhost:3000/images/${filename}`;
  const image = await recipeModel.insertImage(req.params.id, url);
  return res.status(200).json(image);
};

module.exports = {
  recipeRegister,
  recipeList,
  recipeDetail,
  recipeEdit,
  recipeDelete,
  recipeImage,
};
