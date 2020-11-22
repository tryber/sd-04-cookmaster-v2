const { recipeModel: { createRecipeModel, getAllRecipes } } = require('../models');

const createRecipeController = async ({ body: {
  name,
  ingredients,
  preparation,
}, user: { userId } }, res) => {
  try {
    const recipe = await createRecipeModel({ name, ingredients, preparation, userId });

    res.status(201).json({ recipe });
  } catch (_err) {
    res.status(500).json({ message: 'unknow error' });
  }
};

const getAllRecipesController = async (_req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.status(200).json(recipes);
  } catch (_err) {
    res.status(500).json({ message: 'unkown error' });
  }
};

module.exports = {
  createRecipeController,
  getAllRecipesController,
};
