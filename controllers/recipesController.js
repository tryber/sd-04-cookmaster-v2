const express = require('express');

const { authMiddleware } = require('../middlewares/auth');

const { recipesModel } = require('../model');
const { recipesService } = require('../service');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const recipe = await recipesModel.addRecipe(name, ingredients, preparation);

  res.status(201).json({ recipe });
});

router.get('/', async (req, res) => {
  const allRecipes = await recipesModel.getAll();
  res.status(200).json(allRecipes);
});

router.get('/:id', recipesService.getById, async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.findById(id);
  return res.status(200).json(recipe);
});

module.exports = router;
