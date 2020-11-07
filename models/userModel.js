const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerUser = async (name, email, password, role = 'user') =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then(({ insertedId }) => ({ user: { name, email, password, role, _id: insertedId } }));

const findUserByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

const findUserById = async (id) =>
  connection().then((db) => db.collection('users').findOne(ObjectId(id)));

module.exports = {
  registerUser,
  findUserByEmail,
  findUserById,
};
