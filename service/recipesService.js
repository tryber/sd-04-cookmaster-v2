const { recipesModel } = require('../model');

const createRecipe = async (name, ingredients, preparation) => {
  const recipe = await recipesModel.addRecipe(name, ingredients, preparation);
  const err = { err: { message: 'Invalid entries. Try again.' }, error: true };
  if (!name || !ingredients || !preparation) return err;

  return recipe;
};

const getAll = async () => {
  const recipe = await recipesModel.getAll();
  if (!recipe) return null;
  return recipe;
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipesModel.findById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return next();
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};
