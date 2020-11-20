const express = require('express');

const auth = require('../middlewares/auth');

const {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipeById,
  getAllRecipes,
} = require('../models/recipesModel');

const {
  recipeDataValidationMiddleware,
  recipeValidationMiddleware,
} = require('../services/recipesService');

const router = express.Router();

router.post('/', auth, recipeDataValidationMiddleware, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const user = req.user;
  const recipe = await createRecipe(name, ingredients, preparation, user.id);

  res.status(201).json({ recipe });
});

router.get('/', async (req, res) => {
  const allRecipes = await getAllRecipes();
  res.status(200).json(allRecipes);
});

router.get('/:id', recipeValidationMiddleware, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  return res.status(200).json(recipe);
});

router.put(
  '/:id',
  recipeValidationMiddleware,
  recipeDataValidationMiddleware,
  auth,
  async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipe = await updateRecipe(id, name, ingredients, preparation);
    return res.status(200).json(recipe);
  },
);

router.delete('/:id', recipeValidationMiddleware, auth, async (req, res) => {
  const { id } = req.params;
  const recipe = await deleteRecipe(id);
  return res.status(204).json(recipe);
});

module.exports = router;
