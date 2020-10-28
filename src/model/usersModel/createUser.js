const connection = require('../connection');

const createUserModel = async (data) => {
  try {
    const db = await connection();
    const userInserted = await db.collection('users').insertOne({ data });

    return userInserted.ops[0];
  } catch (err) {
    console.error('createUserModel', err);
  }
};

module.exports = createUserModel;
