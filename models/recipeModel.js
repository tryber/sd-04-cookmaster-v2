const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId = id) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
  );
  console.log('recipemodel', recipe.ops[0]);
  return recipe.ops[0];
};

module.exports = { createRecipe };
