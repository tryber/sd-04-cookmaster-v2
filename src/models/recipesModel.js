const connection = require('./connection');

const showAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').aggregate({}).toArray());

const createRecipe = async (name, ingredients, preparation, id) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({ name, ingredients, preparation, id });
  return { recipe: newRecipe.ops[0] };
};

module.exports = {
  showAllRecipes,
  createRecipe,
};
