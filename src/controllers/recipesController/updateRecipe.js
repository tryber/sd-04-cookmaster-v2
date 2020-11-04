const { recipesModels } = require('../../model');
const { HTTPStatus } = require('../../config');
const errorsMessages = require('../../service/errorsMessagens');

const updateRecipeController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await recipesModels.updateRecipeModel(data, id);

    const recipeUpdated = await recipesModels.getRecipeByIdModel(id);

    return res.status(HTTPStatus.OK).json(recipeUpdated);
  } catch (err) {
    console.error('updateRecipeController', err.message);
    return errorsMessages(res);
  }
};

module.exports = updateRecipeController;
