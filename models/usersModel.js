const connection = require('./connection');
// const { ObjectId } = require('mongodb');

// cadastrar usuario no banco de dados
const addUser = async (body) => {
  const { name, email, password, role } = body;
  const user = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }),
  );
  return user.ops[0];
};

// seleciona usuario por email
const getUserByEmail = async (email) => {
  const userByEmail = await connection().then((db) => db.collection('users').findOne({ email }));
  return userByEmail;
};

// // seleciona usuario pelo nome
// const getUserByName = async (name) => {
//   const userByName = await connection().then((db) => db.collection('users').findOne({ name }));
//   return userByName;
// };

module.exports = {
  addUser,
  getUserByEmail,
};
