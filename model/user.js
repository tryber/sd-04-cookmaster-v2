const connection = require('./connection');

const registerUser = async (username, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({ username, password }))
    .then((resultRegister) => resultRegister.ops[0].username);

const findByUser = async (username) =>
  connection().then((db) => db.collection('users').findOne({ username }));

module.exports = { registerUser, findByUser };
