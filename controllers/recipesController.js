const express = require('express');
const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');
const recipeValidation = require('../middlewares/recipeValidation');
const validateToken = require('../auth/validateJWT');

const router = express.Router();

router.post('/', recipeValidation.requiredFields, validateToken, async (req, res) => {
  const { name, ingredients, preparation, validToken } = req.body;

  const user = await usersModel.findUserByEmail(validToken.email);

  const { _id } = user;

  const recipe = await recipesModel.registerRecipe(name, ingredients, preparation, _id);

  return res.status(201).json({ recipe });
});

router.get('/', async (_req, res) => {
  const recipes = await recipesModel.getRecipes();

  return res.status(200).json(recipes);
});

module.exports = router;
