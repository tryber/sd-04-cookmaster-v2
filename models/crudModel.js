const { ObjectId } = require('mongodb');
const connection = require('./connector');

const findById = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection(collection).findOne(ObjectId(id));
  return result;
};

const find = async (collection, query = {}) => {
  const db = await connection();
  const results = await db.collection(collection).find(query).toArray();
  return results;
};

const findOne = async (collection, query) => {
  const db = await connection();
  const result = await db.collection(collection).findOne(query);
  return result;
};

const createOne = async (collection, query) => {
  const db = await connection();
  const result = await db.collection(collection).insertOne(query);
  return result.ops[0];
};

const updateOne = async (collection, id, document) => {
  const db = await connection();
  await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: document });
};

const remove = async (collection, id) => {
  const db = await connection();
  await db.collection(collection).deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  find,
  findOne,
  createOne,
  findById,
  updateOne,
  remove,
};
