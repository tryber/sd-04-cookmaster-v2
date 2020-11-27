const connection = require('../database/connection');
const { ObjectId } = require('mongodb');

const create = (recipe) =>
  connection()
  .then(async (schema) => schema.collection('recipes').insertOne(recipe))
  .then((result) => result.ops[0]);

const findByEmail = (email) =>
  connection()
  .then(async (schema) => {
    const userResp = await schema.collection('users').findOne({ email });
    if (!userResp) {
      throw new Error('Incorrect username or password');
    }
    return userResp;
  });

const getAll = () =>
  connection()
  .then(async (schema) => {
    const recipes = await schema.collection('recipes').find().toArray();
    return recipes;
  });

const getById = (id) =>
  connection()
  .then(async (schema) => {
    const recipe = await schema.collection('recipes').findOne({ _id: ObjectId(id) });
    if (!recipe) {
      throw new Error('recipe not found');
    }
    return recipe;
  });

const update = (recipeId, recipeData) => {
  if (!ObjectId.isValid(recipeId)) return Promise.reject(new Error('Wrong id format'));

  return connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(recipeId) }, { $set: recipeData }))
    .then(() => getById(recipeId));
};

const deleteRecipe = (recipeId) => {
  console.log(recipeId);
  if (!ObjectId.isValid(recipeId)) return Promise.reject(new Error('Wrong id format'));
  console.log(recipeId);
  return connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(recipeId) }))
    .then(() => true);
};

module.exports = { create, findByEmail, getAll, getById, update, deleteRecipe };
