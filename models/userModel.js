const connection = require('./connection');

// cadastra usuario
const registerUser = async (name, email, password, role) => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }),
  );
  return result.ops[0];
};

// Procura usuário por email
const findByEmail = async (email) => {
  const result = await connection().then((db) => db.collection('users').findOne({ email }));
  return result;
};

module.exports = {
  registerUser,
  findByEmail,
};
