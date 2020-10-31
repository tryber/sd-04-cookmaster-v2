const validateJWT = require('./validateJwt');
const validateUsers = require('./validateUsers');
const validateRecipes = require('./validateRecipes');
const validateLogin = require('./validateLogin');

module.exports = {
  validateJWT,
  validateUsers,
  validateRecipes,
  validateLogin,
};
