const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getById = async (id) => {
  const db = await connection();
  return db.collection('recipes').findOne(ObjectId(id));
};

const add = async (name, ingredients, preparation, userId) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId: ObjectId(userId) }));
  const recipe = Object.fromEntries(
    Object.entries(result.ops[0]).sort(),
  );
  return recipe;
};

module.exports = {
  add,
  getAll,
  getById,
};
