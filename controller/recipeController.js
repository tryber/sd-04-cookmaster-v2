const recipeServices = require('../services//userServices');

const registerRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  console.log(req.body);

  if (!name || !ingredients || !preparation) return recipeServices.invalideEntries(res);

  res.status(201).json({ recipe: { name, ingredients, preparation, _id } });
};

module.exports = {
  registerRecipe,
};
