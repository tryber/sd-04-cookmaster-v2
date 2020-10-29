const express = require('express');
const RecipeModel = require('../models/recipesModel');
const Validation = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Adicionar Receita
router.post('/', Validation.isValidName, Validation.isValidRecipe, auth, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: id } = req.user;

  const recipe = await RecipeModel.createRecipe(name, ingredients, preparation, id);
  return res.status(201).json({ recipe });
});

// Listar Receitas
router.get('/', async (_req, res) => {
  const recipes = await RecipeModel.findAll();
  return res.status(200).json(recipes);
});

// Listar Receita Específica
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeModel.findById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(recipe);
});
module.exports = router;
