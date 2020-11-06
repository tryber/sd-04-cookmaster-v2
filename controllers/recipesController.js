const recipesModel = require('../models/recipesModel');

// cadastra uma receita
const add = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.user.id;

    // console.log('Req.user: ', req.user);
    const recipe = await recipesModel.add(name, ingredients, preparation, userId);
    res.status(201).json({ recipe });
  } catch (_error) {
    console.log(_error.message);
    res.status(501).json({ message: 'Falha ao cadastrar receita' });
  }
};

// lista todas as receitas
const show = async (req, res) => {
  try {
    const recipes = await recipesModel.getAll();
    res.status(200).json(recipes);
  } catch (_error) {
    res.status(501).json({ message: 'Falha ao listar receitas' });
  }
};

// lista uma receita por id
const showRecipe = async (req, res) => {
  try {
    res.status(200).json(req.recipe);
  } catch (_error) {
    res.status(501).json({ message: 'Falha ao lista receita' });
  }
};

// editar uma receita
const update = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    await recipesModel.update(id, name, ingredients, preparation);
    const recipe = await recipesModel.findById(id);
    res.status(200).json(recipe);
  } catch (_error) {
    res.status(501).json({ message: 'Falha ao editar receita' });
  }
};

// Exclui uma receita
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await recipesModel.remove(id);
    res.status(204).json();
  } catch (_error) {
    res.status(501).json({ message: 'Falha ao excluir receita' });
  }
};

module.exports = {
  add,
  show,
  showRecipe,
  update,
  remove,
};
