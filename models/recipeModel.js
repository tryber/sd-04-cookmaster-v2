const connection = require('./connection');

const createRecipeModel = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne(name, ingredients, preparation, userId);
  console.log(result);
  return result.ops[0];
};

module.exports = {
  createRecipeModel,
};
