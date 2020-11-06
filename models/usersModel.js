const connection = require('./connection');

const getAllUsers = async () => {
  const db = await connection();
  const users = await db.collection('users').find().toArray();
  return users;
};

const getUserByMail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

const addUser = async (email, password, name, role = 'user') => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ email, password, name, role });
  // o OPS retorna todos os objetos que foram inseridos na operação acima.
  // Como só tem 1, pegaremos o de indice 0.
  // so funciona com insertOne. Nao funciona para UpdateOne nem DeleteOne
  return user.ops[0];
};

module.exports = {
  getAllUsers,
  getUserByMail,
  addUser,
};
