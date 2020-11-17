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

const findByEmail = async (collection, email) => {
  const db = await connection();
  const results = await db.collection(collection).findOne({ email });
  return results;
};

module.exports = { createOne, findByEmail };
