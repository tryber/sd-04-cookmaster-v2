const express = require('express');
const recipeModel = require('../models/recipeModel');
const recipeValidation = require('../middlewares/recipeValidation');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

// Post/Create one recipe

router.post(
  '/',
  validateJWT.validateJWTBasic,
  recipeValidation.validatePresenceOfNameIngredientsPreparation,
  async (req, res) => {
    try {
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

// Get all recipes

router.get('/', async (req, res) => {
  try {
    const recipes = await recipeModel.getAllRecipes();
    res.status(200).json(recipes);
  } catch (_e) {
    res.status(501).json({
      message: 'Erro ao puxar todas receitas',
      _e,
    });
  }
});

// Get one specific recipe by id

router.get('/:id', recipeValidation.validateRecipeExistsById, async (req, res) => {
  try {
    res.status(200).json(res.recipe);
  } catch (_e) {
    res.status(501).json({
      message: 'Erro ao baixar essa receita',
      _e,
    });
  }
});

// Update one specific recipe by id

router.put(
  '/:id',
  recipeValidation.validateRecipeExistsById,
  validateJWT.validateJWTToUpdate,
  async (req, res) => {
    console.log('put/:id');

    try {
      const { name, ingredients, preparation } = req.body;

      const recipeUpdated = await recipeModel.updateRecipe(
        req.params.id,
        name,
        ingredients,
        preparation,
      );

      console.log('put recipeUpdated', recipeUpdated);
      // res.status(200).json(res.recipeUpdated);
      res.status(200).json(recipeUpdated);
    } catch (_e) {
      res.status(501).json({
        message: 'Erro ao atualizar essa receita',
        _e,
      });
    }
  },
);

module.exports = router;
