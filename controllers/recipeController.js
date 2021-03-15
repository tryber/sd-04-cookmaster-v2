const { json } = require('body-parser');
const Recipe = require('../models/Recipe');

const add = async (req, res) => {
  try {
    const objRecipe = {
      userId: req.user._id,
      ...req.body
    }

    const recipe = await Recipe.add(objRecipe);
    
    return res.status(201).json({ recipe });
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const getAll = async (req, res) => {
  try {
    const recipes = await Recipe.getAll();

    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const getOne = async (req, res) => {
  try {
    const recipe = await Recipe.getOne(req.params.id);

    if (!recipe) return res.status(404).json({ message: 'recipe not found' });

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const objRecipe = {
      userId: req.user._id,
      ...req.body
    }
    await Recipe.update(id, objRecipe);
    
    return getOne(req, res);
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const remove = async (req, res) => {
  try {
    await Recipe.remove(req.params.id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

module.exports = {
  add,
  getAll,
  getOne,
  update,
  remove
};
