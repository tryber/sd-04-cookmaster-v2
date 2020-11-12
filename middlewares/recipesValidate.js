const { ObjectId } = require('mongodb');
const usersModel = require('../models/usersModel');
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

  if (!ObjectId.isValid(id)) return resp(res, 404, 6);

  const recipe = await recipesModel.readById(id);

  if (!recipe) return resp(res, 404, 6);

  req.recipe = recipe;

  next();
};

const authUser = async (req) => {
  const id = req.params.id;
  const userIdToken = req.id;
  const { userId } = await recipesModel.readById(id);
  const { role } = await usersModel.readById(userIdToken);

  if (userIdToken === userId || role === 'admin') return true;
};

const updateOrDeleteRecipeVal = async (req, _, next) => {
  if (await authUser(req)) next();
};

module.exports = {
  createRecipeVal,
  readRecipeVal,
  updateOrDeleteRecipeVal,
};
