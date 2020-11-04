const { recipesModels } = require('../../model');
const { HTTPStatus } = require('../../config');
const { errorsMessages } = require('../../service');

const getRecipeByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await recipesModels.getRecipeByIdModel(id);

    if (recipe === null || !recipe) {
      return errorsMessages(res, 'recipe not found', 'not_found');
    }

    return res.status(HTTPStatus.OK).json(recipe);
  } catch (err) {
    console.error('getRecipeByIdController', err.message);
    return errorsMessages(res);
  }
};

module.exports = getRecipeByIdController;
