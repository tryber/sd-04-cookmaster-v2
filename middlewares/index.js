const validateToken = require('./validateJWT');
const validateRecipe = require('./validateRecipe');
const validateUserInfo = require('./validateUserInfo');

module.exports = { validateToken, validateRecipe, ...validateUserInfo };
