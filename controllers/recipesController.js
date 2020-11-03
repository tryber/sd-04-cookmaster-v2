const recipesModel = require('../models/recipesModel');

const createRecipeController = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    if (req.user) {
      const { _id } = req.user;
      const create = await recipesModel.createRecipe(name, ingredients, preparation, _id);
      res.status(201).json({ recipe: create });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRecipeController,
};
