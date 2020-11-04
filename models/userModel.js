const connection = require('./connection');

const getUsers = async () => connection().then((db) => db.collection('users').find().toArray());

const findEmail = async (item) =>
  connection().then((db) => db.collection('users').findOne({ email: { $eq: item } }));

const registerUser = async (name, email, password, role = 'user') => {
  const user = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }),
  );
  return user.ops[0];
};
module.exports = { getUsers, registerUser, findEmail };
