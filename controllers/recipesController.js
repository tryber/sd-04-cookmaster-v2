const recipesService = require('../services/recipesService');

const add = ('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  console.log(userId);

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
  res.status(200).json({ recipes });
});

module.exports = {
  add,
  getAll,
};
