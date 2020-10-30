const responseMessage = (message) => ({ message });

const validateCreateRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json(responseMessage('Invalid entries. Try again.'));
  }
  next();
};

module.exports = {
  responseMessage,
  validateCreateRecipe,
};
