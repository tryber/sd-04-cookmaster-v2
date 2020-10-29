const express = require('express');
const validateJwt = require('../middleware/validateJWT');
const { recipeErrorDealer } = require('../middleware/validateInfo');
const RecipeModel = require('../models/recipeModel');

const router = express.Router();

router.post('/', validateJwt, recipeErrorDealer, async (req, res) => {
  const user = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipeRegistered = await RecipeModel.createRecipe(name, ingredients, preparation, user._id);
  res.status(201).json({ recipe: recipeRegistered });
});

module.exports = router;
