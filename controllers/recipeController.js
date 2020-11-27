const recipeModel = require('../model/recipeModel');

const create = async (request, response) => {
  const { _id } = request.user;
  const { name, ingredients, preparation } = request.body;
  if (!name || !ingredients || !preparation) {
    return response.status(400).send({ message: 'Invalid entries. Try again.' });
  }
  recipeModel
    .create({ name, ingredients, preparation, userId: _id })
    .then((recipe) => response.status(201).send({ recipe }))
    .catch(() =>
      response.status(422).send({ message: 'error creating recipe, try again' }));
};

const getAll = async (request, response) => {
  recipeModel
    .getAll()
    .then((recipes) => response.status(200).send(recipes))
    .catch(() =>
      response.status(422).send({ message: 'error creating recipe, try again' }));
};

const getById = async (request, response) => {
  const { id } = request.params;
  recipeModel
    .getById(id)
    .then((recipe) => response.status(200).send(recipe))
    .catch(() =>
      response.status(404).send({ message: 'recipe not found' }));
};

const update = async (request, response) => {
  const recipeId = request.params.id;

  const { _id: userId, role } = request.user;

  const recipeData = request.body;

  const { userId: userIdRecipe } = await recipeModel.getById(recipeId);

  if (userId.toString() !== userIdRecipe.toString() && role !== 'admin') {
    return response.status(401).send({ message: 'User cannot edit this recipe' });
  }

  recipeModel
    .update(recipeId, recipeData)
    .then((result) =>
      response
        .status(200)
        .json(response.json(result)))
    .catch(() =>
      response.status(404).send({ message: 'recipe not found' }));
};

const deleteRecipe = async (request, response) => {
  const recipeId = request.params.id;
  const { _id: userId, role } = request.user;

  const { userId: userIdRecipe } = await recipeModel.getById(recipeId);

  if (userId.toString() !== userIdRecipe.toString() && role !== 'admin') {
    return response.status(401).send({ message: 'User cannot exclude this recipe' });
  }
  recipeModel
    .deleteRecipe(recipeId)
    .then(() =>
      response
        .status(204)
        .json(response.json()))
    .catch(() =>
      response.status(404).send({ message: 'recipe not found' }));
};

const insertImage = async (request, response) => {
  const recipeId = request.params.id;
  const { _id: userId, role } = request.user;
  const { image } = request;

  const { userId: userIdRecipe } = await recipeModel.getById(recipeId);

  if (userId.toString() !== userIdRecipe.toString() && role !== 'admin') {
    return response.status(401).send({ message: 'User cannot edit this recipe' });
  }

  recipeModel
    .update(recipeId, { image })
    .then((result) =>
      response
        .status(200)
        .json(response.json(result)))
    .catch(() =>
      response.status(404).send({ message: 'recipe not found' }));
};

const getImage = (_req, res) => {
  res.status(200).send('Sucesso');
};

module.exports = { create, getAll, getById, update, deleteRecipe, insertImage, getImage };
