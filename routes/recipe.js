/** USER ROUTES */

const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post(
  '/recipes',
  middlewares.validateSessions.token,
  middlewares.validateRecipe.data,
  controllers.recipeController.newRecipe,
);

router.get('/recipes', controllers.recipeController.getAll);

module.exports = router;
