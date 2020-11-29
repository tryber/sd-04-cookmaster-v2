const recipeModel = require('../models/recipeModel');

const messageJson = { message: 'Invalid entries. Try again.' }; // jogar o json na variavel

// verifica se name, ingredients e preparation existe
const validationData = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json(messageJson);
  }
  next();
};
// mostra as recitas
const showRecipes = async (_req, res, next) => {
  const showRecipe = await recipeModel.showRecipes();
  if (showRecipe) {
    return res.status(200).json(showRecipe);
  }
  next();
};

module.exports = { validationData, showRecipes };
