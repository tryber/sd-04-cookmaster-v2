const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  return db.collection('users').find().toArray();
};

const getById = async (id) => {
  const db = await connection();
  return db.collection('users').findOne(ObjectId(id));
};

const add = async (name, email, password) => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password }));
  const user = Object.fromEntries(
    Object.entries(result.ops[0]).sort(),
  );
  return user;
};

module.exports = {
  add,
  getAll,
  getById,
};
