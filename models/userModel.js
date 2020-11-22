const connection = require('./connection');

const createUser = async (name, email, password, role) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => ({ name, email, role, _id: result.insertedId }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const findUserByEmail = async (email) =>
  connection()
    .then((db) => db.collection('users').findOne({ email }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = { createUser, findUserByEmail };
