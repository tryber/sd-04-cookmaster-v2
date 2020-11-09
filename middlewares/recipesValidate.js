const resp = require('../errorMsgs');

const fieldNameIsValid = (name) =>
  name || false;

const fieldIngredientsIsValid = (ing) =>
  ing || false;

const fieldPreparationIsValid = (prep) =>
  prep || false;

module.exports = (req, res, next) => {
  const { name, ingredients: ing, preparation: prep } = req.body;

  if (!(fieldNameIsValid(name) && fieldIngredientsIsValid(ing) && fieldPreparationIsValid(prep))) {
    return resp(res, 400, 1);
  }

  next();
};
