const { recipesModels } = require('../../model');
const { HTTPStatus } = require('../../config');
const errorsMessages = require('../../service/errorsMessagens');

const uploadWithImageController = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;

    const imagePath = `localhost:3000/images/${filename}`;

    const recipe = await recipesModels.getRecipeByIdModel(id);

    if (!recipe) {
      return errorsMessages(res, 'Recipe not found', 'not_found');
    }

    await recipesModels.updateWithImageModel(id, imagePath);

    const recipeWithImg = await recipesModels.getRecipeByIdModel(id);

    return res.status(HTTPStatus.OK).json(recipeWithImg);
  } catch (err) {
    console.error('updateRecipeController', err.message);
    return errorsMessages(res);
  }
};

module.exports = uploadWithImageController;
