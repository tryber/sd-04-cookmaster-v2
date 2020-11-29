const connection = require('./connection');

const addUser = async (name, email, password) => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }),
  );

  return result.ops[0];
};

const findByName = async (name) =>
  connection().then((db) => db.collection('users').findOne({ name }));

const findByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = { addUser, findByName, findByEmail };
