const connection = require('./connection');

const insertRecipe = async (name, ingredients, preparation, userId) => {
  const conn = await connection();
  const createdRecipe = await conn
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return createdRecipe.ops[0];
};

module.exports = {
  insertRecipe,
};
