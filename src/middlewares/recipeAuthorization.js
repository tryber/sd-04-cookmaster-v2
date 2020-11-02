const recipeModel = require('../models/recipeModel');

module.exports = async (req, res, next) => {
  const { id: recipeId } = req.params;
  const { _id: tokenUserId, role: userRole } = req.user;

  const recipeToModify = await recipeModel.listRecipeById(recipeId);

  if (recipeToModify.userId.toString() !== tokenUserId.toString() && userRole === 'user') {
    return res.status(401).json({ message: 'invalid user' });
  }

  if (recipeToModify.userId.toString() !== tokenUserId.toString() && userRole !== 'admin') {
    return res.status(401).json({ message: 'user is not and admin' });
  }

  next();
};
