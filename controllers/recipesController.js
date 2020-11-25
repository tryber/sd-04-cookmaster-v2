const express = require('express');

const auth = require('../middlewares/auth');

const {
  addRecipe,
  // deleteRecipe,
  // updateRecipe,
  // getRecipeById,
  // getAllRecipes,
  // uploadImage,
} = require('../model/recipesModel');
const {
  createRecipe,
  // recipeValidationMiddleware,
  // uploadImageMiddleware,
} = require('../service/recipesService');

const router = express.Router();

router.post('/', auth, createRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  // const user = req.user;
  console.log('oi');
  const recipe = await addRecipe(name, ingredients, preparation);

  res.status(201).json({ recipe });
});

module.exports = router;
