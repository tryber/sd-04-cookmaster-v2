const router = require('express').Router();
const rescue = require('express-rescue');
const { validateRecipe, validateToken } = require('../middlewares');
const validateUserAuth = require('../middlewares/validateUserAuth');
const { generic: { addNew, getAll }, recipes } = require('../models');
const { update, remove } = require('../models/genericModel');

router.get('/', rescue(async (_req, res) => {
  const result = await getAll('recipes');
  res.json(result);
}));

router.get('/:id', rescue(async (req, res) => {
  const result = await recipes.getById(req.params.id);
  res.json(result);
}));

router.put('/:id', validateToken, validateUserAuth, validateRecipe, rescue(async (req, res) => {
  const { body, params: { id } } = req;
  const result = await update('recipes', id, body);
  res.json(result.value);
}));

router.delete('/:id', validateToken, validateUserAuth, rescue(async (req, res) => {
  const { id } = req.params;
  await remove('recipes', id);
  res.status(204).send();
}));

router.post('/', validateToken, validateRecipe, rescue(async (req, res) => {
  const { body, user: { id } } = req;
  const recipe = await addNew('recipes', { ...body, userId: id });
  res.status(201).json({ recipe });
}));

module.exports = router;
