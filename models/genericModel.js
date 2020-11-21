const connection = require('./connection');

const createOne = async (collection, query) => {
  try {
    const db = await connection();
    const result = await db.collection(collection).insertOne(query);
    return result.ops[0];
  } catch (err) {
    throw err;
  }
};

const findOne = async (collection, query) => {
  try {
    const db = await connection();
    const results = await db.collection(collection).findOne(query);
    return results;
  } catch (err) {
    throw err;
  }
};

const findAll = async (collection) => {
  try {
    const db = await connection();
    const results = await db.collection(collection).find({}).toArray();
    return results;
  } catch (err) {
    throw err;
  }
};

module.exports = { createOne, findOne, findAll };
