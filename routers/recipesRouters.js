const express = require('express');
const recipeController = require('../controllers/recipeController');
const recipeMiddleware = require('../middleware/recipeValidate');
const authMiddleware = require('../middleware/userAuthentication');

const router = express.Router();

router.get('/', recipeController.pegarReceitas);
router.post(
  '/',
  authMiddleware.validaJWT,
  recipeMiddleware.validaReceita,
  recipeController.adicionarReceita,
);

module.exports = router;
