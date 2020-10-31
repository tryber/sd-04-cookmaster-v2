const multerUpload = require('./multerUpload');
const validateToken = require('./validateJWT');
const validateRecipe = require('./validateRecipe');
const validateUserInfo = require('./validateUserInfo');
const validateUserAuth = require('./validateUserAuth');

module.exports = {
  validateToken,
  validateRecipe,
  ...validateUserInfo,
  multerUpload,
  validateUserAuth,
};
