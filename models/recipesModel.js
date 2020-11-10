const { ObjectId } = require('mongodb');
const conn = require('./connection');

const create = async ({ name, ingredients, preparation }, userId) => {
  const db = await conn();
  const result = await db.collection('recipes').insertOne({ name, ingredients, preparation, userId });

  return result.ops[0];
};

const read = async () => {
  const db = await conn();

  return db.collection('recipes').find().toArray();
};

const readById = async (id) => {
  const db = await conn();

  return db.collection('recipes').findOne(ObjectId(id));
};

module.exports = {
  create,
  read,
  readById,
};
