const { Router } = require('express');
// { "name" : "Receita do Jacquin", "ingredients" : "Frango",
// "preparation" : "10 minutos no forno" }

const validator = require('../service/validador');
const recipeModel = require('../models/recipeModel');

const recipes = Router();

recipes.post('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  console.log('req.body', name, ingredients, preparation);
  const { _id: userId } = req.data;
  console.log('req.data', req.data);
  const urlImage = null;
  try {
    const valida = await validator.schemaRecipe.validate({ name, ingredients, preparation });
    console.log('valida', valida);
    if (valida) {
      const recipe = await recipeModel.addRecipe(name, ingredients, preparation, urlImage, userId);
      console.log('controller recipe', recipe);
      return res.status(201).json({ recipe });
    }
  } catch (erro) {
    console.log('errorrr', erro);
    return res.status(400).json({ message: `${erro.errors[0]}` });
  }
});

module.exports = recipes;
