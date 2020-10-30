const rescue = require('express-rescue');
const { postCreateRecipesMod, getAllRecipesMod } = require('../models/recipesModel');

const postCreateRecipesCont = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const result = await postCreateRecipesMod(name, ingredients, preparation, _id);

  return res.status(201).json({ recipe: result});
});

const getAllRecipesCont = async (_req, res) => {
  const result = await getAllRecipesMod();

  return res.status(200).json(result);
};

module.exports = { postCreateRecipesCont, getAllRecipesCont };
