const { validCreateUser, emailValidator } = require('./validCreateUser');
const validLogin = require('./validLogin');
const validCreateRecipe = require('./validRecipe');
const uploadImage = require('../service/uploadImage');

module.exports = { validCreateUser, emailValidator, validLogin, validCreateRecipe, uploadImage };
