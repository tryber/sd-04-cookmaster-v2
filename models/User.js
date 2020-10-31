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

const findUserByEmail = async (email) => {
  try {
    const db = await connection();
    const { _id, role } = await db.collection(dbCollection).findOne({ email });
    return { _id, email, role };
  } catch (error) {
    return process.exit(1);
  }
};

const findPassword = async (password) => {
  try {
    const db = await connection();
    const result = await db.collection(dbCollection).findOne({ password });
    if (result) return true;
    return false;
  } catch (error) {
    return process.exit(1);
  }
};

const insertNewUser = async (userData) => {
  try {
    const db = await connection();
    const { ops } = await db.collection(dbCollection).insertOne(userData);
    const { password, ...withouPassword } = ops[0];
    return {
      user: { ...withouPassword },
    };
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = {
  findByEmail,
  findUserByEmail,
  findPassword,
  insertNewUser,
};
