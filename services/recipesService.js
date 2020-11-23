const { getRecipeById } = require('../models/recipesModel');

const multer = require('multer');

const recipeDataValidationMiddleware = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};

const recipeValidationMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return next();
};

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const uploadImageMiddleware = upload.single('image');

module.exports = {
  recipeDataValidationMiddleware,
  recipeValidationMiddleware,
  uploadImageMiddleware,
};
