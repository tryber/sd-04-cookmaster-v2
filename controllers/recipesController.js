const express = require('express');
const recipesValidations = require('../middlewares/recipesValidation');
const model = require('../models/model');

const router = express.Router();

// Register new recipe
router.post(
  '/',
  recipesValidations.validateAuthenticity,
  recipesValidations.validateFields,
  async (req, res) => {
    try {
      const { name, ingredients, preparation } = req.body;
      const { _id } = req.user;

      const recipe = await model.add('recipes', { name, ingredients, preparation, _id });
      return res.status(201).json({ recipe });
    } catch (_e) {
      res.status(501).json({ message: 'Failed to register new recipe!' });
    }
  },
);

// show all recipes
router.get('/', async (_req, res) => {
  const recipes = await model.findAll('recipes');

  res.status(200).json(recipes);
});

module.exports = router;
