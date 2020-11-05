const express = require('express');

const model = require('../models/recipes');

const login = require('../middlewares/tokenValidation');

const validations = require('../middlewares/recipesValidations');

const router = express.Router();

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
    const { name, ingredients, preparation } = req.body;
    await model.update(id, name, ingredients, preparation);
    const result = await model.getById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: 'missing auth token' });
  }
});

router.delete('/:id', login.tokenValidation, validations.checkRecipeOwner, async (req, res) => {
  const { id } = req.params;
  const delRecipe = await model.del(id);
  res.status(204).json(delRecipe);
});

module.exports = router;
