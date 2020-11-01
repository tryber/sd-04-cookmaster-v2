const { errorsMessages } = require('../service');
const { recipesModel } = require('../model');

const createRecipeController = async (req, res) => {
  try {
    const data = req.body;
    const { _id } = req.user;

    const createRecipe = await recipesModel.createRecipeModel(data, _id);
    console.log('createRecipe', createRecipe);
    return res.status(201).json(createRecipe);
  } catch (err) {
    console.error('createRecipeController', err.message);
    return errorsMessages(res);
  }
};

module.exports = {
  createRecipeController,
};
