const express = require('express');
const recipeController = require('../controllers/recipeController');
const tokenAuthorization = require('../middlewares/tokenAuthorization');
const recipeValidation = require('../middlewares/recipeValidation');

const router = express.Router();

router.post('/', tokenAuthorization, recipeValidation, recipeController.insertRecipe);

router.get('/', recipeController.listAllRecipes);

router.get('/:id', recipeController.listRecipeById);

router.put('/:id', tokenAuthorization, recipeController.updateRecipe);

module.exports = router;
