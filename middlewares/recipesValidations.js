const recipesModel = require('../models/recipesModel');
const { HTTPStatus } = require('../services/httpStatus');

const addRecipeValidation = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};

const recipeExistsValidation = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) {
    return res.status(HTTPStatus.NOT_FOUND).json({ message: 'recipe not found' });
  }

  next();
};

module.exports = {
  addRecipeValidation,
  recipeExistsValidation,
};
