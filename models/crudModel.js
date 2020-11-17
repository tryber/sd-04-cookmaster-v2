const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createOne = async (collection, query) => {
  try {
    const db = await connection();
    const result = await db.collection(collection).insertOne(query);

    return result.ops[0];
  } catch (err) {
    console.error('createOne', err.message);
  }
};

const findById = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  try {
    const db = await connection();
    const result = await db.collection(collection).findOne(ObjectId(id));

    return result;
  } catch (err) {
    console.error('findById', err.message);
  }
};

const findAll = async (collection, query = {}) => {
  try {
    const db = await connection();
    const results = await db.collection(collection).find(query).toArray();

    return results;
  } catch (err) {
    console.error('findAll', err.message);
  }
};

const findOne = async (collection, query) => {
  try {
    const db = await connection();
    const result = await db.collection(collection).findOne(query);

    return result;
  } catch (err) {
    console.error('findOne', err.message);
  }
};

const updateOne = async (collection, id, document) => {
  try {
    const db = await connection();
    await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: document });
  } catch (err) {
    console.error('updateOne', err.message);
  }
};

const deleteOne = async (collection, id) => {
  try {
    const db = await connection();
    await db.collection(collection).deleteOne({ _id: ObjectId(id) });
  } catch (err) {
    console.error('deleteOne', err.message);
  }
};

module.exports = {
  createOne,
  findById,
  findAll,
  findOne,
  updateOne,
  deleteOne,
};
