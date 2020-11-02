const recipeServices = require('../services/recipeServices');
const { isError } = require('../utils/validation');

const changeRecipeMiddleware = async (req, res, _next) => {
  try {
    const { body, params } = req;
    const response = await recipeServices.changeARecipeInformation(body, params);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecipeMiddleware = async (req, res, _next) => {
  try {
    await recipeServices.deleteService(req.params);
    res.status(204).json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getASpecificRecipeMiddleware = async (req, res, _next) => {
  try {
    const response = await recipeServices.getRecipeById(req.params);
    const message = (response && response.message) ? response.message : null;
    if (isError(message, 'recipe')) {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecipesMiddleware = async (_req, res, _next) => {
  try {
    const response = await recipeServices.listService();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const newRecipeMiddleware = async (req, res, _next) => {
  try {
    const { body, user } = req;
    const response = await recipeServices.insertNewRecipe(body, user);
    const message = (response && response.message) ? response.message : null;

    if (isError(message, 'Invalid')) {
      return res.status(400).json(response);
    }
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  changeRecipeMiddleware,
  deleteRecipeMiddleware,
  getASpecificRecipeMiddleware,
  getRecipesMiddleware,
  newRecipeMiddleware,
};
