const { recipesModels } = require('../../model');
const { errorsMessages } = require('../../service');
const { HTTPStatus } = require('../../config');

const deleteRecipeController = async (req, res) => {
  try {
    const { id } = req.params;

    await recipesModels.deleteRecipeModel(id);

    return res.status(HTTPStatus.NO_CONTENT).end();
  } catch (err) {
    console.error('deleteRecipeController', err);
    return errorsMessages(res);
  }
};

module.exports = deleteRecipeController;
