const recipeModel = require('../models/recipeModel');

const insertRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const insertedRecipe = await recipeModel.insertRecipe(name, ingredients, preparation);

    res.status(201).json({ recipe: insertedRecipe });
  } catch (err) {
    res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  insertRecipe,
};
