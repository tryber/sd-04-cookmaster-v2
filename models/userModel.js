const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerUser = async (name, email, password, role = 'user') => {
  const result = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .catch((err) => {
      throw err;
    });
  return result.ops[0];
};

const getAllUsers = async () =>
  connection()
    .then((db) => db.collection('users').find().toArray())
    .catch((err) => {
      throw err;
    });

const getUserById = async (id) =>
  connection()
    .then((db) => db.collection('users').findOne({ _id: ObjectId(id) }))
    .catch((err) => {
      throw err;
    });

const getUserByEmail = async (email) =>
  connection()
    .then((db) => db.collection('users').findOne({ email }))
    .catch((err) => {
      throw err;
    });

const deleteUser = async (id) =>
  connection()
    .then((db) => db.collection('users').deleteOne({ _id: ObjectId(id) }))
    .catch((err) => {
      throw err;
    });

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
};
