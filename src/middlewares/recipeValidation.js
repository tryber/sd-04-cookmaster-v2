const recipeSchema = require('../schemas/recipeSchema');

module.exports = (req, res, next) => {
  const validationResult = recipeSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};
