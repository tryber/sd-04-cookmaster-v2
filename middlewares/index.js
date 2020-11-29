const errorHandler = require('./error');
const auth = require('./auth');
const recipeValidation = require('./recipeValidation');
const loginValidation = require('./loginValidation');
const userValidation = require('./userValidation');

module.exports = {
  errorHandler,
  auth,
  recipeValidation,
  loginValidation,
  userValidation,
};
