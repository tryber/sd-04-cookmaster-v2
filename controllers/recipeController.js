const recipeServices = require('../services/recipeServices');

const isError = (object, text) => object && object.includes(text);

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
  newRecipeMiddleware,
};
