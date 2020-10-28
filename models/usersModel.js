require('dotenv').config();
const connection = require('./connection');

const findUserByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

const createUser = async (name, email, password, role = 'user') => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }),
  );
  return result.ops[0];
};

module.exports = { findUserByEmail, createUser };
