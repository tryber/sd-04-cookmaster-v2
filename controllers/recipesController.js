const express = require('express');
const validateJWT = require('../auth/validateJWT');
// importando o validationRecipes do Middleware
const validationRecipes = require('../middlewares/validationRecipes');
// importando o recipeModel do Model
const recipeModel = require('../models/recipeModel');
// criando a rota
const router = express.Router();

const messageJson = { message: 'Ivalid entries.' }; // jogar o json na variavel

const validationData = [validationRecipes.validationData]; // jogar a validação em uma variável
const validationRecipe = [validationRecipes.showRecipes];
router.post('/', validateJWT, validationData, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const recipes = await recipeModel.addRecipe(name, ingredients, preparation);
    return res.status(201).json({ recipe: recipes });
  } catch (_e) {
    return res.status(400).json(messageJson);
  }
});

router.get('/', validationRecipe);

module.exports = router;
