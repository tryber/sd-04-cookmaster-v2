const { getAll, getRecipeById, newRecipeInsert } = require('../models/allModel');

const listRecipes = async (_req, res) => {
  const recipes = await getAll();

  return res.status(200).json({ recipes });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeById(id);

  if (!recipe) {
    res.status(404).jason({ message: 'recipe not found' });
  }

  return res.status(200).json({ recipe });
};

const NewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.params;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const recipe = await newRecipeInsert({ name, ingredients, preparation, userId });
  return res.status(201).json({ recipe });
};

module.exports = {
  listRecipes,
  recipeDetails,
  NewRecipe,
};
