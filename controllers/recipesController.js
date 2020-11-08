const express = require('express');
const authValidation = require('../middlewares/authValidation');
const { addRecipeValidation } = require('../middlewares/recipesValidations');
const recipesModel = require('../models/recipesModel');
const { HTTPStatus } = require('../services/httpStatus');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const allRecipes = await recipesModel.getAllRecipes();
    return res.status(HTTPStatus.OK).json(allRecipes);
  } catch (e) {
    console.log(e);
    return res.status(HTTPStatus.INTERNAL_ERROR);
  }
});

router.post('/',
  addRecipeValidation,
  authValidation,
  async (req, res) => {
    try {
      const { name, ingredients, preparation } = req.body;

      // req.body.role injetado diretamente no addUser, com valor 'user'.
      const recipe = await recipesModel.addRecipe(name, ingredients, preparation);

      return res.status(HTTPStatus.CREATED).json({ recipe });
    } catch (_err) {
      return res.status(HTTPStatus.BAD_REQUEST);
    }
  });

module.exports = router;
