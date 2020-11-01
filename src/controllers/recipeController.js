const { response } = require('express');
const recipeModel = require('../models/recipeModel');
const recipeService = require('../services/recipeService');
const { ERR_INVALID_USER, ERR_NOT_AN_ADMIN } = require('../utils/errorTypes');

const insertRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const insertedRecipe = await recipeModel.insertRecipe(name, ingredients, preparation, _id);

    res.status(201).json({ recipe: insertedRecipe });
  } catch (_err) {
    res.status(500).json({ message: 'internal error' });
  }
};

const listAllRecipes = async (_req, res) => {
  try {
    const recipes = await recipeModel.listAllRecipes();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'internal error' });
  }
};

const listRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeModel.listRecipeById(id);
    res.status(200).json(recipe);
  } catch (_err) {
    res.status(404).json({ message: 'recipe not found' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = req.body;
    const { id: recipeId } = req.params;
    const { _id: tokenUserId, role: userRole } = req.user;

    const updatedRecipe = await recipeService.updateRecipe(recipeId, tokenUserId, userRole, recipe);

    return res.status(200).json(updatedRecipe);
  } catch (err) {
    switch (err.message) {
      case ERR_INVALID_USER:
        res.status(401).json({ message: 'invalid user' });
        break;
      case ERR_NOT_AN_ADMIN:
        res.status(401).json({ message: 'you are not an admin' });
        break;
      default:
        res.status(500).json({ message: 'internal error' });
    }
  }
};

module.exports = {
  insertRecipe,
  listAllRecipes,
  listRecipeById,
  updateRecipe,
};
