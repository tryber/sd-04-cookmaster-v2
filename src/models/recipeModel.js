const connection = require('./connection');

const insertRecipe = async (name, ingredients, preparation, userId) => {
  const conn = await connection();
  const createdRecipe = await conn
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return createdRecipe.ops[0];
};

const listRecipes = async () => {
  const conn = await connection();
  return conn.collection('recipes').find().toArray();
};

module.exports = {
  insertRecipe,
  listRecipes,
};
