const express = require('express');
const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');

exports.post = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { email } = req.user;

  const user = await usersModel.findUserByEmail(email);

  const { _id } = user;

  const recipe = await recipesModel.registerRecipe(name, ingredients, preparation, _id);

  return res.status(201).json({ recipe });
};

exports.get = async (_req, res) => {
  const recipes = await recipesModel.getRecipes();

  return res.status(200).json(recipes);
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipesModel.getRecipeById(id);

  if (!recipe) {
    res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
};

exports.put = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { email } = req.user;

  const user = await usersModel.findUserByEmail(email);

  if (user) {
    const updatedRecipe = await recipesModel.updateRecipe(id, name, ingredients, preparation);
    if (updatedRecipe) {
      const recipeUpdated = await recipesModel.getRecipeById(id);
      return res.status(200).json(recipeUpdated);
    }
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const { email } = req.user;

  const user = await usersModel.findUserByEmail(email);

  if (user) {
    const deleted = await recipesModel.removeRecipe(id);
    if (deleted) {
      return res.status(204).json({ message: 'deleted' });
    }
  }
};

exports.putImage = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  const user = await usersModel.findUserByEmail(email);

  if (user) {
    const result = await recipesModel.addImage(id);
    if (result) {
      const recipeUpdatedWithImage = await recipesModel.getRecipeById(id);
      return res.status(200).json(recipeUpdatedWithImage);
    }
  }
};
