const connection = require('./connection');

const registerUser = async (name, email, password, role) => {
  const data = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }),
  );

  return data.ops[0];
};

const findByEmail = async (email) => {
  const data = await connection().then((db) => db.collection('users').find({ email }).toArray());

  return data[0];
};

module.exports = {
  registerUser,
  findByEmail,
};
