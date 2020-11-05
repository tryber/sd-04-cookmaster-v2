const recipeModel = require('../models/recipes');
const userModel = require('../models/usersModel');

const message = 'Invalid entries. Try again.';

const existingElements = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) res.status(400).json({ message });
  next();
};

const checkRecipeOwner = async (req, res, next) => {
  try {
    const loggedUser = req.user;
    const recipeOwner = await recipeModel.getById(req.params.id);
    const userRole = await userModel.getById(loggedUser);
    if (loggedUser === recipeOwner.userId || userRole.role === 'admin') {
      return next();
    }
  } catch (error) {
    res.status(401).json({ message: 'missing auth token' });
  }
};

module.exports = {
  existingElements,
  checkRecipeOwner,
};
