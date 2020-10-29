const rescue = require('express-rescue');
const { validateRecipe, validateToken } = require('../middlewares');
const { addNew } = require('../models/genericModel');

const postNew = rescue(async (req, res) => {
  const { body, user: { id } } = req;
  const recipe = await addNew('recipes', { ...body, userId: id });
  res.status(201).json({ recipe });
});

module.exports = { postNew: [validateToken, validateRecipe, postNew] };
