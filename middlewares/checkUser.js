const recipesService = require('../services/recipesService');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { userRole, userId } = req.user;
  const { userId: recipeUser } = await recipesService.readOne(id);
  if (recipeUser.toString() !== userId && userRole !== 'admin') {
    return res.status(403).json({ message: 'not authroized' });
  }
  return next();
};
