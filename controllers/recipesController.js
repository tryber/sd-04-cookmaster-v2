const express = require('express');
const validateJWT = require('../auth/validateJWT');
const recipesValidations = require('../middlewares/recipesValidations');
const recipesModel = require('../model/recipesModel');

const router = express.Router();

router.post('/', validateJWT, recipesValidations.fieldExistsValidation, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;

    const recipeSaved = await recipesModel.addRecipe(name, ingredients, preparation);
    console.log(recipeSaved);

    return res.status(201).json({ recipe: recipeSaved });
  } catch (_e) {
    res.status(400).json({ message: 'Invalid entries. recipesController Try again.' });
  }
});

// Exibe receita específica
router.get('/:id', async (req, res) => {
  try {
    console.log('entrou na parte específica');
    const { id } = req.params;
    const specificRecipe = await recipesModel.findRecipeById(id);

    res.status(200).json(specificRecipe);
  } catch (_e) {
    res.status(404).json({ message: 'recipe not found' });
  }
});

router.get('/', recipesValidations.listRecipes);
// router.get('/', validateJWT, recipesValidations.listRecipes);

module.exports = router;
