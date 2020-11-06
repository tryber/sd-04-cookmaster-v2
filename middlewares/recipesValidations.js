const recipesModel = require('../models/recipesModel');

// Validações - Cadastro
const requiredFields = (req, res, next) => {
  const { name, preparation, ingredients } = req.body;

  if (!name || !preparation || !ingredients) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

// Id - valida se a receita exite por Id
const validateRecipeExistsById = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipesModel.findById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  req.recipe = recipe;
  next();
};

module.exports = {
  requiredFields,
  validateRecipeExistsById,
};
