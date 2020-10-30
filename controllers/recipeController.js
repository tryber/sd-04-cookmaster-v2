const recipeModel = require('../model/recipeModel');

const adicionarReceita = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const result = await recipeModel.adicionarReceita(_id, name, ingredients, preparation);

  res.status(201).json({ result });
};

const pegarReceitas = async (req, res) => {
  const receitas = await recipeModel.getAll();

  console.log(receitas);
};

module.exports = {
  adicionarReceita,
  pegarReceitas,
};
