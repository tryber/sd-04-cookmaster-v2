const express = require('express');

const model = require('../models/recipes');

const users = require('../models/usersModel');

const token = require('../models/login');

const login = require('../services/token');

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
  const { mail } = await token.checkToken();
  const { _id } = await users.findByMail(mail);
  const { name, ingredients, preparation } = req.body;
  const recipe = await model.add(name, ingredients, preparation, _id);
  res.status(201).json({ recipe });
});

module.exports = router;
