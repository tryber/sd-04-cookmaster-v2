const express = require('express');
const validation = require('../middlewares/validation');
const tokenValidation = require('../auth/token');
const model = require('../models/user');

const router = express.Router();

// Register new recipe
router.post(
  '/',
  tokenValidation.validateToken(),
  tokenValidation.verifyToken,
  validation.recipeFields,
  async (req, res) => {
    try {
      const { name, ingredients, preparation } = req.body;
      const { _id } = req.user;
      const recipe = await model.add('recipes', { name, ingredients, preparation, userId: _id });
      return res.status(201).json({ recipe });
    } catch (_e) {
      res.status(501).json({ message: 'Failed to register new recipe!' });
    }
  },
);

router.get('/', async (_req, res) => {
  try {
    const recipes = await model.findAll('recipes');
    res.status(200).json(recipes);
  } catch (_e) {
    res.status(501).json({ message: 'Ops, something went worng!' });
  }
});

router.get(
  '/:id',
  tokenValidation.validateToken(false),
  tokenValidation.verifyToken,
  validation.recipeFields,
  async (req, res) => res.status(200).json(req.recipe);
);

router.get(
  '/',
  tokenValidation.validateToken(false),
  tokenValidation.verifyToken,
  async (_req, res) => {
    const recipes = await model.findAll('recipes');

    res.status(200).json(recipes);
  },
);

module.exports = router;
