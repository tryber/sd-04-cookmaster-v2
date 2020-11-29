const recipesModel = require('../models/recipesModel');

const register = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    const { _id: id } = user;

    const recipe = await recipesModel.addRecipe(name, ingredients, preparation, id);

    return res.status(201).json({ recipe });
  } catch (_err) {
    res.status(500).json({ message: 'Error in controller register' });
  }
};

const getAll = async (_req, res) => {
  try {
    const recipes = await recipesModel.getRecipes();

    return res.status(200).json(recipes);
  } catch (_err) {
    res.status(500).json({ message: 'Error in controller getAll' });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await recipesModel.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }

    return res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error in controller getOne', err });
  }
};

const editOne = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;

    await recipesModel.updateRecipe(id, name, ingredients, preparation);
    const recipe = await recipesModel.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'recipe not found' });
    }

    return res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error in controller editOne', err });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    await recipesModel.removeRecipe(id);

    return res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Error in controller deleteOne', err });
  }
};

const edit2Image = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    const imgUrl = `localhost:3000/images/${filename}`;

    await recipesModel.updateImageRecipe(id, imgUrl);
    const recipe = await recipesModel.findById(id);

    return res.status(200).json(recipe);
  } catch (_err) {
    res.status(500).json({ message: 'Error in controller edit2Image' });
  }
};

module.exports = { register, getAll, getOne, editOne, deleteOne, edit2Image };
