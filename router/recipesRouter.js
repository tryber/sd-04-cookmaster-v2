const express = require('express');

const userValidations = require('../middlewares/userValidations');
const recipesValidations = require('../middlewares/recipesValidations');
const controllers = require('../controllers');

const recipesRouter = express.Router();

// Cadastra receita
recipesRouter.post(
  '/',
  recipesValidations.requiredFields,
  userValidations.authenticateToken,
  controllers.recipesController.add,
);

// Lista todas as receitas
recipesRouter.get(
  '/',
  controllers.recipesController.show,
);

// Lista uma receita específica
recipesRouter.get(
  '/:id',
  recipesValidations.validateRecipeExistsById,
  controllers.recipesController.showRecipe,
);

// Edita uma receita
recipesRouter.put(
  '/:id',
  userValidations.authenticateToken,
  controllers.recipesController.update,
);

// Exckusão de uma receita
recipesRouter.delete(
  '/:id',
  userValidations.authenticateToken,
  controllers.recipesController.remove,
);

module.exports = recipesRouter;
