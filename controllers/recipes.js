const express = require('express');
const validation = require('../middlewares/validation');
const tokenValidation = require('../auth/token');
const model = require('../models/user');

const router = express.Router();

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

router.get(
  '/',
  tokenValidation.validateToken(false),
  tokenValidation.verifyToken,
  async (_req, res) => {
    try {
      const recipes = await model.findAll('recipes');
      res.status(200).json(recipes);
    } catch (_e) {
      res.status(501).json({ message: 'Ops, something went worng!' });
    }
  },
);

router.get(
  '/:id',
  tokenValidation.validateToken(false),
  tokenValidation.verifyToken,
  validation.recipeExists,
  async (req, res) => res.status(200).json(req.recipe),
);

router.put(
  '/:id',
  tokenValidation.validateToken(),
  tokenValidation.verifyToken,
  async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.user;
    const { name, ingredients, preparation } = req.body;

    const recipe = await model.findById('recipes', id);
    if (role === 'admin' || _id === recipe.userId) {
      await model.update('recipes', id, { name, ingredients, preparation });

      const updatedRecipe = await model.findById('recipes', id);

      return res.status(200).json(updatedRecipe);
    }

    return res.status(401).json({ message: 'Something went wworn.' });
  },
);

module.exports = router;
