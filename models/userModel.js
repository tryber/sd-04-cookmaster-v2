const connection = require('./connection');

const registerUser = async (name, email, password, role = 'user') => {
  console.log('inside userModel insertOne', name, email, password, role = 'user');
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }),
  );
  return result.ops[0];
};

const findUser = async (username) =>
  connection().then((db) => db.collection('users').findOne({ username }));

const findEmail = async (email) => {
  console.log('inside userModel insertOne', email);
  const result = await connection().then((db) => 
  db.collection('users').findOne({ email }));

  console.log('inside userModel result', result);
  return result;
};

module.exports = { registerUser, findUser, findEmail };
