const recipesModel = require('../models/recipesModel');

const add = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
      return res.status(400).send({ message: 'Invalid entries. Try again.' });
    }
    const recipe = await recipesModel.add(name, ingredients, preparation, _id);
    return res.status(201).json({ recipe });
  } catch (e) {
    return res.status(400).send('Algo deu errado ao tentar cadastrar uma receita');
  }
};

const getAll = async (_req, res) => {
  try {
    const recipes = await recipesModel.getAll();
    if (!recipes) {
      return res.status(404).send({ message: 'Não foi possível retornar as receitas' });
    }
    return res.status(200).json(recipes);
  } catch (e) {
    return res.status(404).send({ message: 'Não foi possível retornar as receitas' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesModel.getById(id);
    if (!recipe) {
      return res.status(404).send({ message: 'recipe not found' });
    }
    return res.status(200).json(recipe);
  } catch (e) {
    return res.status(401).send({ message: 'Algo deu errado' });
  }
};

const update = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { _id: userId } = req.user;
    const { role } = req.user;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipesModel.getById(recipeId);
    const userIdRecipe = recipe.userId;
    if (userId.toString() !== userIdRecipe.toString() && role !== 'admin') {
      return res.status(401).send({ message: 'Usuário não pode editar a receita' });
    }
    const recipeUpdate = await recipesModel.update(recipeId, name, ingredients, preparation);
    return res.status(200).json(recipeUpdate);
  } catch (e) {
    return res.status(401).send({ message: 'Algo deu errado' });
  }
};

const exclude = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { _id: userId } = req.user;
    const { role } = req.user;
    const recipe = await recipesModel.getById(recipeId);
    const userIdRecipe = recipe.userId;
    if (userId.toString() !== userIdRecipe.toString() && role !== 'admin') {
      return res.status(401).send({ message: 'Usuário não pode excluir a receita' });
    }
    if (!recipe) {
      return res.status(404).send({ message: 'Receita não encontrada' });
    }
    await recipesModel.exclude(recipeId);
    return res.status(204).send('No body returned for response');
  } catch (e) {
    return res.status(401).send({ message: 'Algo deu errado' });
  }
};

const insertUrlImage = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { filename } = req.file;
    const { _id: userId } = req.user;
    const { role } = req.user;
    const recipe = await recipesModel.getById(recipeId);
    const userIdRecipe = recipe.userId;
    if (userId.toString() !== userIdRecipe.toString() && role !== 'admin') {
      return res.status(401).send({ message: 'Usuário não pode inserir imagem na receita' });
    }
    if (!recipe) {
      return res.status(404).send({ message: 'Receita não encontrada' });
    }
    const urlImage = `localhost:3000/images/${filename}`;
    const recipeUpdate = await recipesModel.insertUrlImage(recipeId, urlImage);
    return res.status(200).json(recipeUpdate);
  } catch (e) {
    return res.status(401).send({ message: 'Algo deu errado' });
  }
};

const getImage = (_req, res) => {
  res.status(200).send('Sucesso');
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude,
  insertUrlImage,
  getImage,
};
