const connection = require('./connection');

const add = async (name, ingredients, preparation, userId) => {
  try {
    const db = await connection();
    const addUser = await db.collection('users').insertOne({ name, ingredients, preparation, userId });
    return addUser.ops[0];
  } catch (e) {
    return null;
  }
};

module.exports = {
  add,
};
