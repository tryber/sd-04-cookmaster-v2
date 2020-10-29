const connection = require('./connection');

const findUserByEmail = async (userEmail) => {
  const conn = await connection();
  const userFound = await conn.collection('users').findOne({ email: userEmail });
  return userFound;
};

const insertUser = async (name, email, password) => {
  const conn = await connection();
  const insertedUser = await conn
    .collection('users')
    .insertOne({ name, email, password, role: 'user' });
  return insertedUser;
};

module.exports = {
  findUserByEmail,
  insertUser,
};
