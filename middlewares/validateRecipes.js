const buildResponse = (message) => ({ message });

const verifyRecipeFields = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (name && ingredients && preparation) return next();

  return res.status(400).json(buildResponse('Invalid entries. Try again.'));
};

module.exports = {
  verifyRecipeFields,
};
