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

router.put('/:id', auth, async (req, res) => {
  const recipe = req.body;
  const { id } = req.params;
  // vem do middleware Auth
  const user = req.user;

  if (user) {
    await RecipeModel.updateRecipe(id, recipe);
    const update = await RecipeModel.findById(id);
    return res.status(200).json(update);
  }

  return res.status(401).json({ message: 'missing auth token' });
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeModel.findById(id);
  const user = req.user;

  if (!recipe) {
    return res.status(500).json({ message: 'Receita não existe' });
  }

  if (user) {
    await RecipeModel.deleteRecipe(id);
    return res.status(204).json();
  }
});

module.exports = router;
