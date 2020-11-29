const path = require('path');
const multer = require('multer');
const { Router } = require('express');
const rescue = require('express-rescue');

const { recipesController } = require('../controllers');
const { auth, recipeValidation } = require('../middlewares');

const recipe = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

recipe.get('/', rescue(recipesController.findAllRecipes));
recipe.post('/', auth(), recipeValidation, rescue(recipesController.createRecipe));
recipe.get('/:id', auth(false), rescue(recipesController.recipeById));
recipe.put('/:id', auth(), rescue(recipesController.editRecipe));
recipe.delete('/:id', auth(), rescue(recipesController.deleteRecipe));
recipe.put('/:id/image', auth(), upload.single('image'), rescue(recipesController.editImage));

module.exports = recipe;
