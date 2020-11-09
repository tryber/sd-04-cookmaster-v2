const express = require('express');
const rescue = require('express-rescue');
const { createRecipeVal, createRecipe } = require('../middlewares');

const router = express.Router();

router.post('/', rescue(createRecipeVal), rescue(createRecipe));

module.exports = router;
