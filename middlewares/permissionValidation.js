const recipesModel = require('../models/recipesModel');
const { HTTPStatus } = require('../services/httpStatus');

const permissionValidation = async (req, res, next) => {
  const { user } = req;
  const { _id } = user;
  const recipeId = req.params.id;
  console.dir(user);
  try {
    if (user.role === 'admin') {
      return next();
    }
    const recipeCreator = await recipesModel.getRecipeById(recipeId);
    if (!_id.equals(recipeCreator.userId)) {
      return res.status(HTTPStatus.UNAUTHORIZED).json({ message: 'Permissão negada' });
    }
    return next();
  } catch (_e) {
    return res.status(HTTPStatus.NOT_FOUND).json({ message: 'recipe not found' });
  }
};

module.exports = permissionValidation;
