const express = require('express');

const multer = require('multer');

const model = require('../models/recipes');

const login = require('../middlewares/tokenValidation');

const validations = require('../middlewares/recipesValidations');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _, callback) => callback(null, `${req.params.id}.jpeg`),
});

const upload = multer({ storage });

router.get('/', async (_, res) => {
  const recipes = await model.getAll();
  res.status(200).json(recipes);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await model.getById(id);
    if (recipes === null) res.status(404).json({ message: 'recipe not found' });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ message: 'recipe not found' });
  }
});

router.post('/', login.tokenValidation, validations.existingElements, async (req, res) => {
  const userId = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipe = await model.add(name, ingredients, preparation, userId);
  res.status(201).json({ recipe });
});

router.put('/:id', login.tokenValidation, validations.checkRecipeOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation, image } = req.body;
    if (image === undefined) {
      await model.update(id, name, ingredients, preparation);
      const result = await model.getById(id);
      return res.status(200).json(result);
    }
    await model.update(id, name, ingredients, preparation, image);
    const result = await model.getById(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: 'missing auth token' });
  }
});

router.delete('/:id', login.tokenValidation, validations.checkRecipeOwner, async (req, res) => {
  const delRecipe = await model.del(req.params.id);
  res.status(204).json(delRecipe);
});

router.put(
  '/:id/image/',
  login.tokenValidation,
  validations.checkRecipeOwner,
  upload.single('image'),
  async (req, res) => {
    try {
      req.file.path = `${req.get('host')}/${req.file.path}`;
      await model.update(req.params.id, req.file.path);
      const result = await model.getById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },
);

module.exports = router;
