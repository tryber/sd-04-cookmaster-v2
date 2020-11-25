const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const form = new FormData();
const { validate } = require('../middlewares/validateJWT');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateImage,
} = require('../models/recipeModel');

const router = express.Router();

router.post('/', validate, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: id } = req.user.data;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const recipe = await createRecipe(name, ingredients, preparation, id);

  return res.status(201).json({ recipe });
});

router.get('/', async (req, res) => {
  const recipe = await getAllRecipes();

  return res.status(200).json(recipe);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipe);
});

router.put('/:id', validate, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const recipe = await updateRecipe(id, name, ingredients, preparation);

  return res.status(200).json(recipe);
});

router.delete('/:id', validate, async (req, res) => {
  const { id } = req.params;
  const product = await deleteRecipe(id);

  res.status(204).json(product);
});

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

router.put('/:id/image', validate, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  const { _id: userId, role } = req.user.data;
  console.log(req.file);
  const image = `localhost:3000/${req.file.path}`;

  if (recipe.userId === userId || role === 'admin') {
    const recipeImage = await updateImage(id, image);
    return res.status(200).json(recipeImage);
  }

  return res.status(200).json(recipe);
});

module.exports = router;
