const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertRecipe = async (name, ingredients, preparation, userId) => {
  const conn = await connection();
  const createdRecipe = await conn
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return createdRecipe.ops[0];
};

const listAllRecipes = async () => {
  const conn = await connection();
  return conn.collection('recipes').find().toArray();
};

const listRecipeById = async (recipeId) => {
  const conn = await connection();
  return conn.collection('recipes').findOne(ObjectId(recipeId));
};

module.exports = {
  insertRecipe,
  listAllRecipes,
  listRecipeById,
};
