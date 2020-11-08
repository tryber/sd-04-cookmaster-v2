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

const getByEmail = async (userEmail) => {
  const db = await connection();
  return db.collection('users').findOne({ email: userEmail });
};

const add = async (name, email, password, role) => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));
  const user = Object.fromEntries(
    Object.entries(result.ops[0]).sort(),
  );
  return user;
};

module.exports = {
  add,
  getAll,
  getById,
  getByEmail,
};
