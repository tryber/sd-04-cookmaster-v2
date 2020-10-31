const router = require('express').Router();
const rescue = require('express-rescue');
const { validateRecipe, validateToken, multerUpload, validateUserAuth } = require('../middlewares');
const { generic: { addNew, getAll, update, remove }, recipes } = require('../models');

router.get('/', rescue(async (_req, res) => {
  const result = await getAll('recipes');
  res.json(result);
}));

router.post('/', validateToken, validateRecipe, rescue(async (req, res) => {
  const { body, user: { id } } = req;
  const recipe = await addNew('recipes', { ...body, userId: id });
  res.status(201).json({ recipe });
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

router.put('/:id/image', validateToken, validateUserAuth, multerUpload, rescue(async (req, res) => {
  const { image, params: { id } } = req;
  const result = await update('recipes', id, { image });
  res.json(result.value);
}));

module.exports = router;
