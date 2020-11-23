const { recipeModel: {
  createRecipeModel,
  getAllRecipes,
  getRecipeById,
} } = require('../models');
const { recipeService: { updateRecipe } } = require('../services');

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

const updateRecipeByIdController = async ({ params: { id }, user: { userId, role }, body: {
  name,
  ingredients,
  preparation,
} }, res) => {
  try {
    console.log(userId, role);
    const recipe = await updateRecipe(id, userId, role, name, ingredients, preparation);

    return res.status(200).json(recipe);
  } catch (_err) {
    res.status(500).json({ message: 'unkown error' });
  }
};

module.exports = {
  createRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeByIdController,
};
