const { errorsMessages } = require('../service');

const validCreateRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  switch (true) {
    case !name:
    case !ingredients:
    case !preparation:
      errorsMessages(res, 'Invalid entries. Try again.', 'bad_request');
      break;
    default:
      next();
  }
};

module.exports = validCreateRecipe;
