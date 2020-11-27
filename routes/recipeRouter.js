const express = require('express');
const { auth } = require('../services/auth');

const router = express.Router();

const controllers = require('../controllers');

const multer = require('../services/multer');

router.post('/', auth, controllers.recipeController.create);
router.get('/', controllers.recipeController.getAll);
router.get('/:id', controllers.recipeController.getById);
router.put('/:id/image', auth, multer, controllers.recipeController.insertImage);
router.put('/:id', auth, controllers.recipeController.update);
router.delete('/:id', auth, controllers.recipeController.deleteRecipe);

module.exports = router;
