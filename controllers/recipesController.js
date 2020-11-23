const recipesService = require('../services/recipesService');

const createOne = ('/',
async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  try {
    const recipe = await recipesService.createOne(name, ingredients, preparation, userId);
    if (!recipe) {
      return res.status(400).json({ message: 'User not found' });
    }
    return res.status(201).json({ recipe });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

const readAll = ('/',
async (req, res) => {
  const recipes = await recipesService.readAll();
  res.status(200).json(recipes);
});

const readOne = ('/',
async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await recipesService.readOne(id);
    return res.status(200).json(recipe);
  } catch (e) {
    return res.status(404).json({ message: 'recipe not found' });
  }
});

const updateOne = ('/',
async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { userRole, userId } = req.user;
  try {
    const { userId: recipeUser } = await recipesService.readOne(id);
    if (recipeUser.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: 'not authroized' });
    }
    await recipesService.updateOne(id, name, ingredients, preparation);
    const recipe = await recipesService.readOne(id);
    return res.status(200).json(recipe);
  } catch (e) {
    return res.status(404).json({ message: 'recipe not found' });
  }
});

const deleteOne = ('/',
async (req, res) => {
  const { id } = req.params;
  const { userRole, userId } = req.user;
  try {
    const { userId: recipeUser } = await recipesService.readOne(id);
    if (recipeUser.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: 'not authroized' });
    }
    await recipesService.deleteOne(id);
    return res.status(204);
  } catch (e) {
    return res.status(404).json({ message: 'recipe not found' });
  }
});

module.exports = {
  createOne,
  readAll,
  readOne,
  updateOne,
  deleteOne,
};
