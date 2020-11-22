/* eslint-disable function-paren-newline */
const { connect } = require('mongodb');
const connection = require('./connection');

const addUser = async ({ name, email, password, role }) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then((result) => ({ name, email, role, _id: result.insertedId }));

const findByEmail = async ({ email }) =>
  connect().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  addUser,
  findByEmail,
  // findById,
  // updateUser,
  // isValid,
};
