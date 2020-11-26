const { recipesModel } = require('../model');

const createRecipe = async (name, ingredients, preparation, id) => {
  const recipe = await recipesModel.addRecipe(name, ingredients, preparation, id);
  const err = { err: { message: 'Invalid entries. Try again.' }, error: true };
  if (!name || !ingredients || !preparation) return err;

  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await recipesModel.updateRecipe(id, name, ingredients, preparation);
  if (!recipe) return null;
  return recipe;
};

const deleteRecipe = async (id) => {
  const recipe = await recipesModel.deleteRecipe(id);
  if (!recipe) return null;
  return recipe;
};

const getAll = async () => {
  const recipe = await recipesModel.getAll();
  if (!recipe) return null;
  return recipe;
};

const getById = async (id) => {
  const recipe = await recipesModel.findById(id);
  const err = { err: { message: 'recipe not found' }, error: true };

  if (!recipe) return err;
  return recipe;
};

const updateImage = async (id, image) => {
  const recipe = await recipesModel.updateImage(id, image);
  if (!recipe) return null;
  return recipe;
};

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getAll,
  getById,
  updateImage,
};
