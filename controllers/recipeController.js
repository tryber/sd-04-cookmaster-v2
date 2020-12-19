const recipeModel = require('../model/recipeModel');

const adicionarReceita = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await recipeModel.adicionarReceita(_id, name, ingredients, preparation);

  res.status(201).json({ recipe });
};

const getRecipe = async (_, res) => {
  const receitas = await recipeModel.getAll();

  res.status(200).json(receitas);
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const receita = await recipeModel.getById(id);

    return res.status(200).json(receita);
  } catch (_error) {
    return res.status(404).json({ message: 'recipe not found' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    await recipeModel.update(id, name, ingredients, preparation);

    const result = await recipeModel.getById(id);

    return res.status(200).json(result);
  } catch (_error) {
    return res.status(401).json({ message: 'Id invalid' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await recipeModel.deleteRecipe(id);

    res.status(204).json({});
  } catch (error) {
    res.status(401).json({ messe: 'error' });
  }
};

module.exports = {
  updateRecipe,
  getRecipeById,
  adicionarReceita,
  getRecipe,
  deleteRecipe,
};
