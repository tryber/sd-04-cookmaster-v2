const connection = require('./connection');

const dbCollection = 'users';

const findByEmail = async (email) => {
  try {
    const db = await connection();
    const result = await db.collection(dbCollection).findOne({ email });
    if (result) return true;
    return false;
  } catch (error) {
    return process.exit(1);
  }
};

const inserNewUser = async (userData) => {
  try {
    const db = await connection();
    const result = await db.collection(dbCollection).isertOne(userData);
    console.log(result);
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = {
  findByEmail,
  inserNewUser,
};
