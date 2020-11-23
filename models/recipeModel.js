const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipeModel = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne(name, ingredients, preparation, userId);
  return result.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getRecipeById = async (id) => {
  const db = await connection();
  return db.collection('recipes').findOne(ObjectID(id));
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const result = await db.collection('recipes').updateOne(
    { _id: ObjectID(id) },
    { $set: { name, ingredients, preparation } },
  );
  return result;
};

module.exports = {
  createRecipeModel,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
};
