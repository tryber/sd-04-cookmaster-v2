const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection();
  const recipe = await result
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return recipe.ops[0];
};

// const findByEmail = async (email) =>
//   connection().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  createRecipe,
};
