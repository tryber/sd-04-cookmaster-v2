/** USER ROUTES */

const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');
const multeruploader = require('../middlewares/multeruploader');

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
router.delete(
  '/recipes/:id',
  middlewares.validateSessions.token,
  controllers.recipeController.deleteRecipe,
);
router.put(
  '/:id/image',
  middlewares.validateSessions.token,
  multeruploader,
  controllers.recipeController.updateImage,
);

module.exports = router;
