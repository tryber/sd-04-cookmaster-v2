const connection = require('./connection');

const createRecipeModel = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne(name, ingredients, preparation, userId);
  console.log(result);
  return result.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

module.exports = {
  createRecipeModel,
  getAllRecipes,
};
