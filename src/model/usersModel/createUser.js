const connection = require('../connection');

const createUserModel = async (user) => {
  try {
    const db = await connection();
    const userInserted = await db.collection('users').insertOne({ ...user });

    return { user: userInserted.ops[0] };
  } catch (err) {
    console.error('createUserModel', err.message);
  }
};

module.exports = createUserModel;
