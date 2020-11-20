const express = require('express');

const auth = require('../middlewares/auth');

const { createRecipe } = require('../models/recipesModel');

const { recipeDataValidationMiddleware } = require('../services/recipesService');

const router = express.Router();

router.post('/', auth, recipeDataValidationMiddleware, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const user = req.user;
  console.log(user);
  const recipe = await createRecipe(name, ingredients, preparation, user.id);

  res.status(201).json({ recipe });
});

module.exports = router;
