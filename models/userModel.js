const connection = require('./connection');

const addUser = async (name, email, password, role) => {
  const result = await connection();
  const add = await result.collection('users').insertOne({ name, email, password, role });
  return add.ops[0];
};

const findByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  addUser,
  findByEmail,
};
