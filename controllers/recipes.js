const express = require('express');
const validation = require('../middlewares/validation');
const model = require('../models/user');

const router = express.Router();

// Register new recipe
router.post('/', validation.auth, validation.recipeFields, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const recipe = await model.add('recipes', { name, ingredients, preparation, _id });
    return res.status(201).json({ recipe });
  } catch (_e) {
    res.status(501).json({ message: 'Failed to register new recipe!' });
  }
});

module.exports = router;
