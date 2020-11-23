const express = require('express');
const { validate } = require('../middlewares/validateJWT');
const { createRecipe } = require('../models/recipeModel');

const router = express.Router();

router.post('/', validate, async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const recipe = await createRecipe(name, ingredients, preparation);

  return res.status(201).json({ recipe });
});

module.exports = router;
