const recipesModel = require('../model/recipesModel');

const fieldExistsValidation = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const listRecipes = async (req, res, next) => {
  try {
    console.log('entrou no listRecipes');
    const listOfRecipes = await recipesModel.listOfRecipes();
    console.log(listOfRecipes.recipe);

    return res.status(200).json(listOfRecipes);
  } catch (_e) {
    return res.status(404).json({ message: 'Invalid entries AA. Try again.' });
  }
};

module.exports = { fieldExistsValidation, listRecipes };
// desestruturar a saída do cadastro da receita com o receita:
