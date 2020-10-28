require('dotenv').config();
const connection = require('./connection');

const getRecipes = async () => connection().then((db) => db.collection('recipes').find().toArray());

const registerRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
  );

  return result.ops[0];
};

module.exports = { getRecipes, registerRecipe };
