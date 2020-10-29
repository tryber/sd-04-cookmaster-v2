const connection = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (name, ingredients, preparation, userId) => {
  try {
    const db = await connection();
    const addUser = await db.collection('recipes').insertOne({ name, ingredients, preparation, userId });
    return addUser.ops[0];
  } catch (e) {
    return null;
  }
};

const getAll = async () => {
  try {
    const db = await connection();
    const recipes = await db.collection('recipes').find().toArray();
    return recipes;
  } catch (e) {
    return null;
  }
};

const getById = async (id) => {
  try {
    const db = await connection();
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return recipe;
  } catch (e) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
  getById,
};
