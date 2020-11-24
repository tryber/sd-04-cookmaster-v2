const express = require('express');

const router = express.Router();
const recipesModel = require('../models/recipesModel');
const validations = require('../middlewares/validations');

router.get('/', async (req, res) => {
  const allRecipes = await recipesModel.showAllRecipes();
  return res.status(200).json(allRecipes);
});

router.post('/',
  validations.validationName,
  validations.validRecipe,
  validations.validToken,
  async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;

    const newRecipe = await recipesModel.createRecipe(name, ingredients, preparation, id);
    return res.status(201).json(newRecipe);
  });

router.get('/:id',
  async (req, res) => {
    const { id } = req.params;
    const recipe = await recipesModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }
    return res.status(200).json(recipe);
  });

router.put('/:id',
  validations.validToken,
  async (req, res) => {
    const { id } = req.params;
    const recipe = req.body;
    const userForTest = req.user;

    if (userForTest) {
      await recipesModel.updateRecipe(id, recipe);
      const updated = await recipesModel.findById(id);
      return res.status(200).json(updated);
    }
    return res.status(401).json({ message: 'missing auth token' });
  });

router.delete('/:id',
  validations.validToken,
  async (req, res) => {
    const { id } = req.params;
    const userForTest = req.user;
    const recipe = await recipesModel.findById(id);

    if (!recipe) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    if (userForTest) {
      await recipesModel.deleteRecipe(id);
      return res.status(204).json();
    }
  });

module.exports = router;
