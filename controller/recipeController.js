const recipeServices = require('../services//userServices');
const recipeModel = require('../models/recipeModel');

const registerRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  console.log(req.body);

  if (!name || !ingredients || !preparation) return recipeServices.invalideEntries(res);

  const recipe = await recipeModel.registerRecipe(name, ingredients, preparation, _id);

  res.status(201).json({ recipe });
};

module.exports = {
  registerRecipe,
};
