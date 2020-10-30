const rescue = require('express-rescue');
const {
  postCreateRecipesMod,
  getAllRecipesMod,
  getByIdRecipesMod,
  updateRecipesMod,
  deleteRecipesMod,
} = require('../models/recipesModel');

const postCreateRecipesCont = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const result = await postCreateRecipesMod(name, ingredients, preparation, _id);

  return res.status(201).json({ recipe: result });
});

const getAllRecipesCont = rescue(async (_req, res) => {
  const result = await getAllRecipesMod();

  return res.status(200).json(result);
});

const getByIdRecipesCont = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await getByIdRecipesMod(id);
  if (!result) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(result);
});

const updateRecipesCont = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const result = await updateRecipesMod(id, name, ingredients, preparation);

  return res.status(200).json(result);
});

const deleteRecipesCont = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await deleteRecipesMod(id);

  return res.status(204).json(result);
});

module.exports = {
  postCreateRecipesCont,
  getAllRecipesCont,
  getByIdRecipesCont,
  updateRecipesCont,
  deleteRecipesCont,
};
