const express = require('express');
const multer = require('multer');

const { authMiddleware } = require('../middlewares/auth');

const { recipesService } = require('../service');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: id } = req.user.data;

  const recipe = await recipesService.createRecipe(name, ingredients, preparation, id);

  if (recipe.error) return res.status(400).json(recipe.err);

  res.status(201).json({ recipe });
});

router.get('/', async (req, res) => {
  const recipe = await recipesService.getAll();
  res.status(200).json(recipe);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);

  if (recipe.error) return res.status(404).json(recipe.err);

  res.status(200).json(recipe);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const recipe = await recipesService.updateRecipe(id, name, ingredients, preparation);
  res.status(200).json(recipe);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const product = await recipesService.deleteRecipe(id);

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

router.put('/:id/image', authMiddleware, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  const { _id: userId, role } = req.user.data;
  const image = `localhost:3000/${req.file.path}`;

  if (recipe.userId === userId || role === 'admin') {
    const recipeImage = await recipesService.updateImage(id, image);
    return res.status(200).json(recipeImage);
  }

  res.status(200).json(recipe);
});

module.exports = router;
