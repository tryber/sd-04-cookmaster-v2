const connection = require('./connection');

const add = async (name, email, password) => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password }),
  );
  return result.ops[0];
};

const findByEmail = async (email) => {
  const emailResult = await connection().then((db) => db.collection('users').findOne({ email }));
  return emailResult;
};

module.exports = { add, findByEmail };
