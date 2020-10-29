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

module.exports = {
  add,
};
