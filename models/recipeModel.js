const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addRecipe = async (name, ingredients, preparation, urlImage, userId) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, urlImage, userId }));
  return recipe.ops[0];
};

const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find({}).toArray());

const recipeById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = {
  addRecipe,
  getAllRecipes,
  recipeById,
};
