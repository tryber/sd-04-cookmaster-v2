const validation = require('../utils/validation');
const Recipe = require('../models/Recipe');

const insertNewRecipe = async ({ name, ingredients, preparation }, { _id }) => {
  if (validation.isFieldsInvalid(name, ingredients, preparation)) {
    return validation.errMessage(validation.ENTRIES_MESSAGE);
  }
  const insertResponse = await Recipe.insertNewRecipe({ name, ingredients, preparation }, _id);
  return insertResponse;
};

module.exports = {
  insertNewRecipe,
};
