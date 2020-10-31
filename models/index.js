
const {
  postCreateUsersMod,
  getUserEmailMod,
  getUserByIdMod,
  postCreateAdminMod,
} = require('./usersModel');
const {
  postCreateRecipesMod,
  getAllRecipesMod,
  getByIdRecipesMod,
  updateRecipesMod,
  deleteRecipesMod,
  updateImageRecipesMod,
} = require('./recipesModel');

module.exports = {
  postCreateUsersMod,
  getUserEmailMod,
  getUserByIdMod,
  postCreateAdminMod,
  postCreateRecipesMod,
  getAllRecipesMod,
  getByIdRecipesMod,
  updateRecipesMod,
  deleteRecipesMod,
  updateImageRecipesMod,
};
