const recipesService = require('../services/recipesService');

const add = ('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  try {
    const recipe = await recipesService.add(name, ingredients, preparation, userId);
    if (!recipe) {
      return res.status(400).json({ message: 'User not found' });
    }
    return res.status(201).json({ recipe });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

const getAll = ('/', async (req, res) => {
  const recipes = await recipesService.getAll();
  res.status(200).json(recipes);
});

const getOne = ('/', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await recipesService.getOne(id);
    return res.status(200).json(recipe);
  } catch (e) {
    return res.status(404).json({ message: 'recipe not found' });
  }
});

module.exports = {
  add,
  getAll,
  getOne,
};
