const connection = require('./connection');

const createUser = async (name, email, password, role) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => ({ name, email, role, _id: result.insertedId }));

const findUserByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = { createUser, findUserByEmail };
