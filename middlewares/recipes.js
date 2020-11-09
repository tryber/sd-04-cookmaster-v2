const recipesModel = require('../models/recipesModel');
const resp = require('../errorMsgs');

const createRecipe = async (req, res) => {
  const userId = req.id;
  const recipe = await recipesModel.create(req.body, userId);

  resp(res, 201, null, { recipe });
};

module.exports = {
  createRecipe,
};
