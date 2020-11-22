const { recipeModel: {
  createRecipeModel,
  getAllRecipes,
  getRecipeById,
} } = require('../models');

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

const getRecipeByIdController = async ({ params: { id } }, res) => {
  try {
    const recipe = await getRecipeById(id);

    res.status(200).json(recipe);
  } catch (_err) {
    res.status(404).json({ message: 'recipe not found' });
  }
};

module.exports = {
  createRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
};
