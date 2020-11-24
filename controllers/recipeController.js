const express = require('express');
const { validate } = require('../middlewares/validateJWT');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../models/recipeModel');

const router = express.Router();

router.post('/', validate, async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const recipe = await createRecipe(name, ingredients, preparation);

  return res.status(201).json({ recipe });
});

router.get('/', async (req, res) => {
  const recipe = await getAllRecipes();

  return res.status(200).json(recipe);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipe);
});

router.put('/:id', validate, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const recipe = await updateRecipe(id, name, ingredients, preparation);

  return res.status(200).json(recipe);
});

router.delete('/:id', validate, async (req, res) => {
  const { id } = req.params;
  const product = await deleteRecipe(id);

  res.status(204).json(product);
});

module.exports = router;
