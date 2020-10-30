const { Router } = require('express');
// const { ObjectId } = require('mongodb');

const validator = require('../service/validador');
const recipeModel = require('../models/recipeModel');
const validateJWT = require('../service/validateJWT');

const recipes = Router();

recipes.post('/', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.headers.authorization;
  const urlImage = null;
  try {
    const valida = await validator.schemaRecipe.validate({ name, ingredients, preparation });
    if (valida) {
      const recipe = await recipeModel.addRecipe(name, ingredients, preparation, urlImage, userId);
      return res.status(201).json({ recipe });
    }
  } catch (erro) {
    return res.status(400).json({ message: `${erro.errors[0]}` });
  }
});

recipes.get('/', async (_req, res) => {
  try {
    const allRecipes = await recipeModel.getAllRecipes();
    return res.status(200).json(allRecipes);
  } catch (error) {
    return res.status(400).json({ message: 'Something bad happened' });
  }
});

recipes.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('iddd', id);
  // if (ObjectId.isValid(id)) {
  try {
    const recipeId = await recipeModel.recipeById(id);
    console.log('recipe by id', recipeId);
    if (recipeId) return res.status(200).json(recipeId);
  } catch (error) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  // return res.status(400).json({ message: 'recipe not found' });
  // }
});
module.exports = recipes;
