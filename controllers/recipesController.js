const { Router } = require('express');
const multer = require('multer');
const { create, findAll, findById, update, deleteData } = require('../models');
const { verifyRecipeFields } = require('../middlewares');
const { verifyToken, validateToken } = require('../auth');

const router = Router();

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.get('/',
validateToken(false),
verifyToken,
async (_req, res) => {
  const ListAllRecipes = await findAll('recipes');

  return res.status(200).json(ListAllRecipes);
});

router.get('/:id',
validateToken(false),
verifyToken,
async (req, res) => {
  const { id } = req.params;

  const recipe = await findById('recipes', id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipe);
});

router.post('/',
  validateToken(),
  verifyToken,
  verifyRecipeFields,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const recipe = await create('recipes', { name, ingredients, preparation, userId: _id });

    res.status(201).json({ recipe });
  });

router.put('/:id',
  validateToken(),
  verifyToken,
  async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.user;
    const { name, ingredients, preparation } = req.body;

    const recipe = await findById('recipes', id);

    if (role === 'admin' || _id === recipe.userId) {
      await update('recipes', id, { name, ingredients, preparation });

      const updateRecipe = await findById('recipes', id);

      return res.status(200).json(updateRecipe);
    }
    return res.status(401).json({ message: 'you cant update this recipe' });
  });

router.put('/:id/image',
  validateToken(),
  verifyToken,
  upload.single('image'),
  async (req, res) => {
    const { id } = req.params;

    await update('recipes', id, { image: `localhost:3000/${req.file.path}` });

    const result = await findById('recipes', id);

    res.status(200).json(result);
  });

router.delete('/:id',
  validateToken(),
  verifyToken,
  async (req, res) => {
    const { id } = req.params;
    const { role, _id } = req.user;

    const recipe = await findById('recipes', id);

    if (role === 'admin' || _id === recipe.userId) {
      await deleteData('recipes', id);

      return res.status(204).json();
    }
    return res.status(401).json({ message: 'you cant delete this recipe' });
  });

module.exports = router;
