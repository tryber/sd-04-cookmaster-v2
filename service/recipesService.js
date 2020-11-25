const { recipesModel } = require('../model');

const createRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
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
  getById,
};
