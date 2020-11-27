const connection = require('./connection');

const findByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

const createUser = async (name, email, password, role = 'user') => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, email, password, role });
  return newUser.ops[0];
};

module.exports = {
  findByEmail,
  createUser,
};
