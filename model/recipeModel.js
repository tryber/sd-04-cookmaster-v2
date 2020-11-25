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

module.exports = { create, findByEmail, getAll, getById };
