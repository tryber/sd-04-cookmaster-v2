const { recipeModel } = require('../model');

const newRecipe = async (req, res) => {
  const recipeData = req.body;

  recipeModel
    .create(recipeData)
    .then((response) => res.status(201).send({ recipe: response }))
    .catch(() => res.status(409).send({ message: 'Failed to save recipe' }));
};

const getAll = (_req, res) =>
  recipeModel.recipes().then((recipes) => res.status(200).send(recipes));

module.exports = { newRecipe, getAll };
