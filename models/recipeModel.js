const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) => db.collection('recipes').find().toArray())
    .catch((err) => {
      throw err;
    });

const getRecipeById = async (id) =>
  connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
    .catch((err) => {
      throw err;
    });

const registerRecipe = async (name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
    .catch((err) => {
      throw err;
    });

module.exports = {
  getAllRecipes,
  getRecipeById,
  registerRecipe,
};
