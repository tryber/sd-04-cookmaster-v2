// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Cria um novo usuário-----------------------------------------------------------------------
const createUser = async (name, email, password) =>
  connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }),
  );

// Pega um usuário pelo EMAIL------------------------------------------------------------------
const getUserByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = { createUser, getUserByEmail };
