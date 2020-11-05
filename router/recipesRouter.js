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

module.exports = recipesRouter;
