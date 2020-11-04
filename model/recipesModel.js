const connection = require('../model/connection');

const addRecipe = async (name, ingredients, preparation) => {
  const registerResult = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation }),
  );
  return registerResult.ops[0];
};

const listOfRecipes = async () => {
  const recipesResult = await (
    await connection().then((db) => db.collection('recipes').find({}))
  ).toArray();

  return recipesResult;
};

module.exports = { addRecipe, listOfRecipes };
