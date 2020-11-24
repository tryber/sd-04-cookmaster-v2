const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }));

const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  }

  return null;
};

const updateRecipe = async (id, name, ingredients, preparation) =>
  connection()
    .then((db) =>
      db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
    )
    .then(() => ({ _id: id, name, ingredients, preparation }));

const deleteRecipe = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  }

  return null;
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };
