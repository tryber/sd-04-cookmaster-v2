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
  const uniqueRecipe = await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)),
  );
  return uniqueRecipe;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
  );
};

const removeRecipe = async (id) => {
  await connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = { addRecipe, listOfRecipes, findRecipeById, editRecipe, removeRecipe };
