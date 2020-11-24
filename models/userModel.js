const connection = require('./connection');

const getUserByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

const createUserModel = async (name, email, password, role) =>
  connection().then((db) => db.collection('users').insertOne({ name, email, password, role }));

module.exports = {
  getUserByEmail,
  createUserModel,
};
