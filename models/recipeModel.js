const connection = require('./connection');
const { ObjectID } = require('mongodb');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
  );
  return recipe.ops[0];
};

const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  return connection().then((db) => db.collection('recipes').findOne(ObjectID(id)));
};

const updateRecipe = async (id, name, ingredients, preparation) =>
  connection().then((db) =>
    db.collection('recipes').updateOne(
      {
        _id: ObjectID(id),
      },
      { $set: { name, ingredients, preparation } },
    ),
  );

const deleteRecipe = async (id) =>
  connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectID(id) }));

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };
