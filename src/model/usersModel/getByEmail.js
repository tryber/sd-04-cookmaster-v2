const connection = require('../connection');

const getByEmailModel = async (email) => {
  try {
    const db = await connection();
    const userEmail = await db.collection('users').findOne({ email });

    return userEmail;
  } catch (err) {
    console.error('getByEmailModel', err.message);
  }
};

module.exports = getByEmailModel;
