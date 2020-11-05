const { ObjectId } = require('mongodb');
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

const findRecipeById = async (id) => {
  console.log('AQUI ID FIND', id);
  const uniqueRecipe = await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)),
  );
  console.log('ERA PRA SER UNIQUE', uniqueRecipe);
  return uniqueRecipe;
};

module.exports = { addRecipe, listOfRecipes, findRecipeById };
