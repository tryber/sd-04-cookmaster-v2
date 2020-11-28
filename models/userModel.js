const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addUser = async (name, email, password) => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }),
  );

  return result.ops[0];
};

const findByName = async (name) =>
  connection().then((db) => db.collection('users').findOne({ name }));

module.exports = { addUser, findByName };
