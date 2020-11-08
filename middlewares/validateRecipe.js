const { recipeValidation } = require('../models/recipesModel');

const validateRecipe = (req, _res, next) => {
  recipeValidation(req.body);
  next();
};

module.exports = validateRecipe;
