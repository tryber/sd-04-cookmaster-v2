/* eslint-disable function-paren-newline */
const connection = require('./connection');

const addUser = async (name, email, password, role) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => ({ name, email, role, _id: result.insertedId }));

const findByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  addUser,
  findByEmail,
  // findById,
  // updateUser,
  // isValid,
};
