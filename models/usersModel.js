const connection = require('./connection');

const findUserByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

const findUserByPassword = async (password) =>
  connection().then((db) => db.collection('users').findOne({ password }));

const registerUser = async (name, email, password, role = 'user') => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }),
  );
  return result.ops[0];
};

module.exports = { findUserByEmail, registerUser, findUserByPassword };
