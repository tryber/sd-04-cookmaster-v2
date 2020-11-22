const { recipeModel: { createRecipeModel } } = require('../models');

const createRecipeController = async ({ body: {
  name,
  ingredients,
  preparation,
}, user: { userId } }, res) => {
  const recipe = await createRecipeModel({ name, ingredients, preparation, userId });

  console.log(recipe);

  res.status(201).json({ recipe });
};

module.exports = {
  createRecipeController,
};
