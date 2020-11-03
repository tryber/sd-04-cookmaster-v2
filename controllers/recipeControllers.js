const express = require('express');
const recipeModel = require('../models/recipeModel');
const recipeValidation = require('../middlewares/recipeValidation');

const router = express.Router();

// Post/Create one user

router.post(
  '/',
  recipeValidation.validatePresenceOfNameIngredientsPreparation,
  async (req, res) => {
    try {
      console.log('here is recipeModel', req.body);
      const { name, ingredients, preparation } = req.body;
      const recipe = await recipeModel.registerRecipe(name, ingredients, preparation);
      res.status(201).json({ recipe });
    } catch (_e) {
      res.status(501).json({
        message: 'Erro ao salvar a receita no banco',
        _e,
      });
    }
  },
);
module.exports = router;
