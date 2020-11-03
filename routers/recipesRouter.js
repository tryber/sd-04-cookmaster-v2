const express = require('express');
const userController = require('../controllers/recipesController');
const validateToken = require('../auth/validateToken');
const middlewares = require('../middlewares/recipes');

const router = express.Router();

const { createRecipeController } = userController;
const { recipeVerify } = middlewares;

router.post('/', validateToken, recipeVerify, createRecipeController);

module.exports = router;
