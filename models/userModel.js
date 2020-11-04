const connection = require('./connection');

const registerUser = async (name, email, password, role) => {
  const data = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }),
  );

  return data.ops[0];
};

const findByEmailOne = async (email) => {
  try {
    const data = await connection().then((db) => db.collection('users').findOne({ email }));
    return data;
  } catch (err) {
    return 'error';
  }
};

module.exports = {
  registerUser,
  findByEmailOne,
};
