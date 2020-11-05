const recipeModel = require('../models/recipesModel');

// cadastra uma receita
const add = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.user.id;

    // console.log('Req.user: ', req.user);
    const recipe = await recipeModel.add(name, ingredients, preparation, userId);
    res.status(201).json({ recipe });
  } catch (_error) {
    console.log(_error.message);
    res.status(501).json({ message: 'Falha ao cadastrar receita' });
  }
};

module.exports = {
  add,
};
