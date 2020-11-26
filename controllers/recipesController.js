const express = require('express');

const { authMiddleware } = require('../middlewares/auth');

const { recipesModel } = require('../model');
const { recipesService } = require('../service');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: id } = req.user.data;
  // console.log(req.user);
  const recipe = await recipesService.createRecipe(name, ingredients, preparation, id);

  if (recipe.error) return res.status(400).json(recipe.err);

  res.status(201).json({ recipe });
});

router.get('/', async (req, res) => {
  const recipe = await recipesService.getAll();
  res.status(200).json(recipe);
});

router.get('/:id', recipesService.getById, async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.findById(id);
  return res.status(200).json(recipe);
});

module.exports = router;
