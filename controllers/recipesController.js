const router = require('express').Router();
const rescue = require('express-rescue');
const { validateRecipe, validateToken } = require('../middlewares');
const { generic: { addNew, getAll }, recipes } = require('../models');

router.get('/', rescue(async (_req, res) => {
  const result = await getAll('recipes');
  res.json(result);
}));

router.get('/:id', rescue(async (req, res) => {
  const result = await recipes.getById(req.params.id);
  res.json(result);
}));

router.post('/', validateToken, validateRecipe, rescue(async (req, res) => {
  const { body, user: { id } } = req;
  const recipe = await addNew('recipes', { ...body, userId: id });
  res.status(201).json({ recipe });
}));

module.exports = router;
