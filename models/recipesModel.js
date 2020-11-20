const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const getAllRecipes = async () =>
  connection()
    .then((db) => db.collection('recipes').find().toArray())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const getRecipeById = async (id) => {
  try {
    if (!ObjectID.isValid(id)) {
      return null;
    }
    const db = await connection();
    const recipe = await db.collection('recipes').findOne(ObjectID(id));
    return recipe;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};
module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
