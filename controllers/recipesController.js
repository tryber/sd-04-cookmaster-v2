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
    const { id } = req.params;
    const { user } = req;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipesModel.getById(id);
    const { userId } = recipe;
    if (user._id.toString() !== userId.toString() && user.role !== 'admin') {
      return res.status(401).send({ message: 'Usuário não pode editar a receita' });
    }
    const recipeUpdate = await recipesModel.update(id, name, ingredients, preparation);
    return res.status(200).json(recipeUpdate);
  } catch (e) {
    return res.status(401).send({ message: 'Algo deu errado' });
  }
};

module.exports = {
  add,
  getAll,
  getById,
  update,
};
