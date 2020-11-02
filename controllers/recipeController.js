const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path');
const recipeService = require('../services/recipeService');

const newRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user } = req;

  if (!name || !ingredients || !preparation || !user) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const recipeCreated = await recipeService.newRecipe(name, ingredients, preparation, user);

  return res.status(201).json({ recipe: recipeCreated });
});

const getAllRecipes = rescue(async (_req, res) => {
  const recipes = await recipeService.getAllRecipes();
  return res.status(200).json(recipes);
});

const editRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { user } = req;

  const recipe = await recipeService.editRecipe(id, name, ingredients, preparation, user);

  return res.status(200).json(recipe);
});

const findRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.findRecipeById(id);

  if (recipe.message) return res.status(404).json(recipe);

  return res.status(200).json(recipe);
});

const deleteRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  await recipeService.deleteRecipe(id);
  return res.status(204).end();
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const uploadImage = rescue(async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  const uploadedImage = await recipeService.uploadImage(id, filename);

  return res.status(200).json(uploadedImage);
});

module.exports = {
  newRecipe,
  getAllRecipes,
  editRecipe,
  findRecipeById,
  deleteRecipe,
  upload,
  uploadImage,
};
