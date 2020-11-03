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

const updateRecipe = async (recipeId, recipeInfo) => {
  const conn = await connection();
  const updatedRecipe = await conn
    .collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(recipeId) }, { $set: recipeInfo }, { returnOriginal: false });
  return updatedRecipe;
};

const deleteRecipe = async (recipeId) => {
  const conn = await connection();
  await conn.collection('recipes').deleteOne({ _id: ObjectId(recipeId) });
};

module.exports = {
  insertRecipe,
  listAllRecipes,
  listRecipeById,
  updateRecipe,
  deleteRecipe,
};
