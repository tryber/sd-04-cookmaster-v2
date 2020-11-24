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

const createImage = ('/',
async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.readOne(id);
    console.log(recipe);

    const imagePath = `localhost:3000/images/${id}.jpeg`;

    await recipesService.createImage(id, imagePath);

    const updatedRecipe = {
      ...recipe,
      image: imagePath,
    };
    console.log(updatedRecipe);
    res.status(200).json(updatedRecipe);
  } catch (_e) {
    console.log(_e);
    res.status(501).json({
      message: 'Failed to upload image',
    });
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
  } catch (_e) {
    return res.status(404).json({ message: 'recipe not found' });
  }
});

const updateOne = ('/',
async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  try {
    await recipesService.updateOne(id, name, ingredients, preparation);
    const recipe = await recipesService.readOne(id);
    return res.status(200).json(recipe);
  } catch (_e) {
    return res.status(404).json({ message: 'recipe not found' });
  }
});

const deleteOne = ('/',
async (req, res) => {
  const { id } = req.params;
  try {
    await recipesService.deleteOne(id);
    return res.status(204).json({});
  } catch (_e) {
    return res.status(404).json({ message: 'recipe not found' });
  }
});

module.exports = {
  createOne,
  createImage,
  readAll,
  readOne,
  updateOne,
  deleteOne,
};
