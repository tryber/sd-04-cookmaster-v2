const connection = require('./connection');

const getAllRecipes = async () => {
  // pode tentar then
  try {
    const db = await connection(); // pode tentar  com try catch
    const allRecipes = await db.collection('recipes').find({}).toArray();

    return allRecipes;
  } catch (err) {
    console.log('Error', err);
  }
};

const registerRecipe = async (name, ingredients, preparation) => {
  console.log('here is recipe Model', name, ingredients, preparation);
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation }),
  );
  return result.ops[0];
};

module.exports = {
  registerRecipe,
  getAllRecipes,
};
