const recipeModel = require('../model/recipeModel');

const adicionarReceita = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const result = await recipeModel.adicionarReceita(_id, name, ingredients, preparation);

  res.status(201).json({ result });
};

const pegarReceitas = async (_req, res) => {
  const receitas = await recipeModel.getAll();

  res.status(200).json(receitas);
};

module.exports = {
  adicionarReceita,
  pegarReceitas,
};
