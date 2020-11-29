const express = require('express');
const { validateJWT, existToken } = require('../auth/validateJWT');
// importando o validationRecipes do Middleware
const validationRecipes = require('../middlewares/validationRecipes');
// importando o recipeModel do Model
const recipeModel = require('../models/recipeModel');

const fs = require('fs');

const multer = require('multer');

const upload = multer({ dest: 'images' });

// criando a rota
const router = express.Router();

const messageJson1 = { message: 'Ivalid entries.' }; // jogar o json na variavel
const messageJson2 = { message: 'recipe not found' };
const messageJson3 = { message: 'missing auth token' };
const messageJson4 = { message: 'recipe deleted' };

const validationData = [validationRecipes.validationData]; // jogar a validação em uma variável
const validationRecipe = [validationRecipes.showRecipes];
router.post('/', validateJWT, validationData, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const recipes = await recipeModel.addRecipe(name, ingredients, preparation);
    return res.status(201).json({ recipe: recipes });
  } catch (_e) {
    return res.status(400).json(messageJson1);
  }
});

router.get('/', validationRecipe);

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipeById = await recipeModel.showRecipeByid(id);
    return res.status(200).json(recipeById);
  } catch (_e) {
    return res.status(404).json(messageJson2);
  }
});

router.put('/:id', existToken, validateJWT, upload.single('image'), async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    await recipeModel.editRecipe(id, name, ingredients, preparation);
    const updateRecipe = await recipeModel.showRecipeByid(id);
    res.status(200).json(updateRecipe);
  } catch (_e) {
    res.status(401).json(messageJson3);
  }
});

router.delete('/:id', existToken, validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    await recipeModel.deleteRecipe(id);
    res.status(204).json(messageJson4);
  } catch (_e) {
    res.status(401).json(messageJson1);
  }
});
// img
router.put('/:id/image/', validateJWT, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    fs.rename(file.path, `images/${id}.jpeg`, (err) => {
      if (err) throw err;
    });
    const url = `localhost:3000/images/${id}.jpeg`;
    await recipeModel.insertIMG(id, url);
    const recipe = await recipeModel.showRecipeByid(id);
    res.status(200).json(recipe);
  } catch (_e) {
    res.status(404).json(messageJson1);
  }
});

module.exports = router;
