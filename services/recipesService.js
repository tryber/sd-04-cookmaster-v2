const recipesModel = require('../models/recipesModel');

const createOne = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipesModel.add(name, ingredients, preparation, userId);
  return newRecipe;
};

const readAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

const readOne = async (id) => {
  const recipe = await recipesModel.getById(id);
  return recipe;
};

const deleteOne = async (id) => {
  const recipe = await recipesModel.del(id);
  return recipe;
};

const updateOne = async (id, name, ingredients, preparation) => {
  const recipe = await recipesModel.update(id, name, ingredients, preparation);
  return recipe;
};

module.exports = {
  createOne,
  readAll,
  readOne,
  updateOne,
  deleteOne,
};
