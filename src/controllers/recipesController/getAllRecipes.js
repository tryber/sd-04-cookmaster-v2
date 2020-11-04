const { recipesModels } = require('../../model');
const { errorsMessages } = require('../../service');
const { HTTPStatus } = require('../../config');

const getAllRecipesController = async (req, res) => {
  try {
    const data = await recipesModels.getAllRecipesModel();

    if (!data) {
      return errorsMessages(res, 'Recipes not found', 'not_found');
    }

    return res.status(HTTPStatus.OK).json(data);
  } catch (err) {
    console.error('getAllRecipesController', err.message);
    return errorsMessages(res);
  }
};

module.exports = getAllRecipesController;
