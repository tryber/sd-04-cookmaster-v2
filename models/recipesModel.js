const conn = require('./connection');
const { ObjectId } = require('mongodb');

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

const update = async ({ name, ingredients, preparation }, id) => {
  const db = await conn();

  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  return readById(id);
};

const del = async (id) => {
  const db = await conn();

  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  read,
  readById,
  update,
  del,
};
