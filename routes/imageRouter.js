const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

router.get('/:id', controllers.recipeController.getImage);

module.exports = router;
