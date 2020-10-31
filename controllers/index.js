const { postCreateUsersCont, postCreateAdminCont } = require('./usersController');
const {
  postCreateRecipesCont,
  getAllRecipesCont,
  getByIdRecipesCont,
  updateRecipesCont,
  deleteRecipesCont,
  upload,
  updateImageRecipesCont,
} = require('./recipesController');
const { loginUsers } = require('./loginController.js');

module.exports = {
  postCreateUsersCont,
  postCreateAdminCont,
  postCreateRecipesCont,
  getAllRecipesCont,
  getByIdRecipesCont,
  updateRecipesCont,
  deleteRecipesCont,
  upload,
  updateImageRecipesCont,
  loginUsers,
};
