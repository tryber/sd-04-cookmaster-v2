const { HTTPStatus } = require('../services/httpStatus');

const addRecipeValidation = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(HTTPStatus.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};

module.exports = {
  addRecipeValidation,
};
