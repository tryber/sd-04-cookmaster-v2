const express = require('express');
const validateJWT = require('../auth/validateJWT');
const recipesValidations = require('../middlewares/recipesValidations');
const recipesModel = require('../model/recipesModel');

const router = express.Router();

router.post('/', validateJWT, recipesValidations.fieldExistsValidation, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    console.log(req.user);

    console.log('linha 13', name, ingredients, preparation);

    const recipeSaved = await recipesModel.addRecipe(name, ingredients, preparation);
    console.log('REGISTERED', recipeSaved);

    return res.status(201).json(recipeSaved);
  } catch (_e) {
    res.status(400).json({ message: 'Invalid entries. recipesController Try again.' });
  }
});

module.exports = router;
