const conn = require('./connection');
// const { ObjectId } = require('mongodb');

const add = async (user) => {
  try {
    const db = await conn();
    const result = await db.collection('users').insertOne(user);

    return result.ops[0];
  } catch (error) {
    return null;
  }
};

const findEmail = async (email) => {
  try {
    const db = await conn();
    return await db.collection('users').findOne({ email });
  } catch (error) {
    return null;
  }
};

module.exports = {
  add,
  findEmail,
};
