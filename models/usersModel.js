const connection = require('./connection');

const add = async (name, email, password) => {
  try {
    const db = await connection();
    const addUser = await db.collection('users').insertOne({ name, email, password, role: 'user' });
    return addUser.ops[0];
  } catch (e) {
    return null;
  }
};

const findByEmail = async (email) => {
  try {
    const db = await connection();
    const user = await db.collection('users').findOne({ email });
    return user;
  } catch (e) {
    return null;
  }
};

module.exports = {
  add,
  findByEmail,
};
