const multer = require('multer');
const { recipeModel: {
  createRecipeModel,
  getAllRecipes,
  getRecipeById,
  deleteRecipeById,
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

const updateRecipeByIdController = async ({ params: { id }, user: { userId, role }, body,
}, res) => {
  try {
    const recipe = await updateRecipe(id, userId, role, body);

    return res.status(200).json(recipe);
  } catch (_err) {
    res.status(500).json({ message: 'unkown error' });
  }
};

const deleteRecipeByIdController = async ({ params: { id }, user: { userId, role } }, res) => {
  try {
    const recipe = await getRecipeById(id);

    if (userId === recipe.userId || role === 'admin') {
      await deleteRecipeById(id);

      return res.status(204).end();
    }

    return res.status(401).json({ message: 'missing auth token' });
  } catch (_err) {
    res.status(500).json({ message: 'unkown error' });
  }
};

const insertImageController = async ({
  params: { id },
  user: { userId, role },
  file: { path } },
  res) => {
  await updateRecipe(id, userId, role, { image: `localhost:3000/${path}` });
  const recipe = await getRecipeById(id);
  res.status(200).json(recipe);
};

module.exports = {
  createRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeByIdController,
  deleteRecipeByIdController,
  insertImageController,
};
