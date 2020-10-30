const connection = require('../connection');

const createUserModel = async ({ name, email, password, role = 'user' }) => {
  try {
    const db = await connection();
    const userInserted = await db.collection('users').insertOne({ name, email, password, role });

    return { user: userInserted.ops[0] };
  } catch (err) {
    console.error('createUserModel', err.message);
  }
};

module.exports = createUserModel;
