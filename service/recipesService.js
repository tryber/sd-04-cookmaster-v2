// const multer = require('multer');
// const { recipeModel } = require('../model');

const createRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};

module.exports = {
  createRecipe,
};
