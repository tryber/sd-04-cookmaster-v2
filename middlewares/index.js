const { verifyRecipeFields } = require('./validateRecipes');
const {
  verifyRegisterFields,
  verifyUserByEmail,
  validateEmail,
  verifyLoginFields,
  validateLogin,
  validateAdminNewRegister,
} = require('./validateUsers');

module.exports = {
  verifyRegisterFields,
  verifyUserByEmail,
  validateEmail,
  verifyLoginFields,
  validateLogin,
  validateAdminNewRegister,
  verifyRecipeFields,
}
