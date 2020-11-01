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

const updateRecipe = async (recipeId, name, ingredients, preparation) => {
  const conn = await connection();
  const updatedRecipe = await conn
    .collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(recipeId) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );
  return updatedRecipe;
};

module.exports = {
  insertRecipe,
  listAllRecipes,
  listRecipeById,
  updateRecipe,
};
