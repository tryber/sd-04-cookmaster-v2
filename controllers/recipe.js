const { ObjectID } = require('mongodb');
const { recipeModel } = require('../model');

const newRecipe = async (req, res) => {
  const recipeData = req.body;

  recipeModel
    .create(recipeData)
    .then((response) => res.status(201).send({ recipe: response }))
    .catch(() => res.status(409).send({ message: 'Failed to save recipe' }));
};

const getAll = async (_req, res) =>
  recipeModel.recipes().then((recipes) => res.status(200).send(recipes));

const getById = async (req, res) => {
  const recipeId = req.params.id;

  if (!ObjectID.isValid(recipeId)) return res.status(404).send({ message: 'recipe not found' });

  recipeModel.recipe(ObjectID(recipeId)).then((recipe) => {
    if (!recipe) return res.status(404).send({ message: 'recipe not found' });

    return res.status(200).send(recipe);
  });
};

const updateRecipe = (req, res) => {
  const recipeId = req.params.id;
  const recipeData = req.body;

  if (!ObjectID.isValid(recipeId)) return res.status(404).send({ message: 'recipe not found' });

  recipeModel.updateRecipe(ObjectID(recipeId), recipeData).then((recipe) => {
    if (!recipe) return res.status(404).send({ message: 'recipe not found' });

    return res.status(200).send({
      name: recipeData.name,
      ingredients: recipeData.ingredients,
      preparation: recipeData.preparation,
    });
  });
};

const deleteRecipe = (req, res) => {
  const recipeId = req.params.id;

  if (!ObjectID.isValid(recipeId)) return res.status(404).send({ message: 'Invalid recipe' });

  recipeModel.deleteRecipe(ObjectID(recipeId)).then((response) => {
    if (!response) return res.status(404).send({ message: 'Invalid recipe' });

    return res.status(204).send('deleted');
  });
};

module.exports = { newRecipe, getAll, getById, updateRecipe, deleteRecipe };
