const connection = require('./connection');

const add = async (name, email, password) => {
  console.log(name, email, password);
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password }),
  );
  return result.ops[0];
};

const findByEmail = async (email) => {
  console.log(email, 'findByEmail');
  const emailResult = await connection().then((db) => db.collection('users').findOne({ email }));
  return emailResult;
};

module.exports = { add, findByEmail };
