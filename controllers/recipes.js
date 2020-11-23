const express = require('express');
const { recipeExists, recipeFields } = require('../middlewares/validations');
const { validateToken, verifyToken } = require('../authentication');
const crud = require('../models');
const upload = require('../services/upload');

const router = express.Router();

router.post('/', validateToken(), verifyToken, recipeFields, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
    const recipe = await crud.create('recipes', { name, ingredients, preparation, userId });
    return res.status(201).json({ recipe });
  } catch (_e) {
    res.status(501).json({ message: 'Failed to register new recipe!' });
  }
});

router.get('/', validateToken(false), verifyToken, async (_req, res) => {
  try {
    const recipes = await crud.findAll('recipes');
    res.status(200).json(recipes);
  } catch (_e) {
    res.status(501).json({ message: 'Ops, something went worng!' });
  }
});

router.get('/:id', validateToken(false), verifyToken, recipeExists, async (req, res) =>
  res.status(200).json(req.recipe),
);

router.put('/:id', validateToken(), verifyToken, async (req, res) => {
  const { id } = req.params;
  const { role, _id } = req.user;
  const { name, ingredients, preparation } = req.body;

  const recipe = await crud.findById('recipes', id);
  if (role === 'admin' || _id === recipe.userId) {
    await crud.update('recipes', id, { name, ingredients, preparation });

    const updatedRecipe = await crud.findById('recipes', id);

    return res.status(200).json(updatedRecipe);
  }

  return res.status(401).json({ message: 'Something went wrong.' });
});

router.delete('/:id', validateToken(), verifyToken, async (req, res) => {
  const { id } = req.params;
  const { role, _id } = req.user;

  const recipe = await crud.findById('recipes', id);

  if (role === 'admin' || _id === recipe.userId) {
    await crud.deleteOne('recipes', id);
    return res.sendStatus(204);
  }
  return res.status(401).json({ message: 'you cant delete this recipe' });
});

router.put(
  '/:id/image/',
  recipeExists,
  validateToken(),
  verifyToken,
  upload.single('image'),
  async (req, res) => {
    const {
      params: { id },
    } = req;
    try {
      const recipe = await crud.findById('recipes', id);

      const image = `localhost:3000/images/${id}.jpeg`;

      await crud.update('recipes', id, { image });

      const updatedRecipe = {
        ...recipe,
        image,
      };

      res.status(200).json(updatedRecipe);
    } catch (_err) {
      res.status(501).json({
        message: 'Failed to upload image',
      });
    }
  },
);

module.exports = router;
