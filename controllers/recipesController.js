const express = require('express');

const auth = require('../middlewares/auth');

const {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipeById,
  getAllRecipes,
  uploadImage,
} = require('../models/recipesModel');
const {
  recipeDataValidationMiddleware,
  recipeValidationMiddleware,
  uploadImageMiddleware,
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
  auth,
  recipeValidationMiddleware,
  recipeDataValidationMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipe = await updateRecipe(id, name, ingredients, preparation);
    return res.status(200).json(recipe);
  },
);

router.delete('/:id', auth, recipeValidationMiddleware, async (req, res) => {
  const { id } = req.params;
  const recipe = await deleteRecipe(id);
  return res.status(204).json(recipe);
});

router.put('/:id/image', auth, uploadImageMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(id);

    const image = `localhost:3000/images/${id}.jpeg`;

    await uploadImage('recipes', id, image);

    const updatedRecipe = {
      ...recipe,
      image,
    };
    res.status(200).json(updatedRecipe);
  } catch (err) {
    console.error(err);
    res.status(501).json({
      message: 'Failed to upload image',
    });
  }
});

module.exports = router;
