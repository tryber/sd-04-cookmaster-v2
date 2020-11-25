const express = require('express');

const auth = require('../middlewares/auth');

const { recipesModel } = require('../model');
const { recipesService } = require('../service');

const router = express.Router();

router.post('/', auth, recipesService.createRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  // const user = req.user;
  console.log('oi');
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
