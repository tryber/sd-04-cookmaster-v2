const validation = require('../middlewares/validations');

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const isError = await validation.fieldsIngredients.validate({ name, ingredients, preparation });
  if (isError.error) {
    return res.status(400).json({ message: isError.error.message });
  }

  next();
};

module.exports = { validateRecipe };
