// const { DB, ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (name, email, password, role) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({ user: { name, email, password, role } });
  return result.ops[0];
};

const findByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ 'user.email': email });
  // console.log(result);
  return result;
};

module.exports = { add, findByEmail };
