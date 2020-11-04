const { HTTPStatus } = require('../../config');
const { errorsMessages } = require('../../service');
const { recipesModels } = require('../../model');

const createRecipeController = async (req, res) => {
  try {
    const data = req.body;
    const { _id } = req.user;

    const createRecipe = await recipesModels.createRecipeModel(data, _id);

    return res.status(HTTPStatus.CREATED).json(createRecipe);
  } catch (err) {
    console.error('createRecipeController', err.message);
    return errorsMessages(res);
  }
};

module.exports = createRecipeController;
