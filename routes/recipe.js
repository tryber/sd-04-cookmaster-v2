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
router.get('/recipes/:id', controllers.recipeController.getById);
router.put(
  '/recipes/:id',
  middlewares.validateSessions.token,
  middlewares.validateRecipe.data,
  controllers.recipeController.updateRecipe,
);

module.exports = router;
