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

const getAllRecipesController = async (req, res) => {
  try {
    const allRecipes = await recipesModel.getAllRecipesModel();

    if (!allRecipes) {
      return errorsMessages(res, 'Recipes not found', 'not_found');
    }

    return res.status(200).json(allRecipes);
  } catch (err) {
    console.error('getAllRecipesController', err.message);
    return errorsMessages(res);
  }
};

const getRecipeByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await recipesModel.getRecipeByIdModel(id);

    if (recipe === null || !recipe) {
      return errorsMessages(res, 'recipe not found', 'not_found');
    }

    return res.status(200).json(recipe);
  } catch (err) {
    console.error('getRecipeByIdController', err.message);
    return errorsMessages(res);
  }
};

const updateRecipeController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await recipesModel.updateRecipeModel(data, id);

    const updated = await recipesModel.getRecipeByIdModel(id);

    return res.status(200).json(updated);
  } catch (err) {
    console.error('updateRecipeController', err.message);
    return errorsMessages(res);
  }
};


module.exports = {
  createRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeController,
};
