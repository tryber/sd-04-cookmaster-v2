const connection = require('./connection');

const userInsert = async (user) => {
  const schema = await connection();
  const newUser = await schema.collection('users').insertOne(user);
  return newUser.ops[0];
};

const findUserByEmail = async (email) => {
  const schema = await connection();
  const user = await schema.collection('users').findOne({ email });
  return user;
};

module.exports = {
  userInsert,
  findUserByEmail,
};
