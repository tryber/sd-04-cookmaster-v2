const recipesModel = require('../models/recipesModel');
const resp = require('../errorMsgs');

const fieldNameIsValid = (name) =>
  name || false;

const fieldIngredientsIsValid = (ing) =>
  ing || false;

const fieldPreparationIsValid = (prep) =>
  prep || false;

const createRecipeVal = (req, res, next) => {
  const { name, ingredients: ing, preparation: prep } = req.body;

  if (!(fieldNameIsValid(name) && fieldIngredientsIsValid(ing) && fieldPreparationIsValid(prep))) {
    return resp(res, 400, 1);
  }

  next();
};

const readRecipeVal = async (req, res, next) => {
  const id = req.params.id;
  const recipe = await recipesModel.readById(id);

  if (!recipe) return resp(res, 404, 6);

  req.recipe = recipe;

  next();
};

module.exports = {
  createRecipeVal,
  readRecipeVal,
};
