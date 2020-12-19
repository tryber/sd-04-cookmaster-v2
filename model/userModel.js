const connection = require('./connection');

const USERS = 'users';

const cadUser = async (name, email, password, role = 'user') => {
  const usuario = { name, email, password, role };
  const user = await connection().then((db) => db.collection(USERS).insertOne(usuario));

  return user.ops[0];
};

const getByEmail = async (email) =>
  connection().then((db) => db.collection(USERS).findOne({ email: `${email}` }, { email: 1 }));

const getByPassword = async (password) =>
  connection().then((db) =>
    db.collection(USERS).findOne({ password: `${password}` }, { password: 1 }),
  );

module.exports = {
  getByEmail,
  getByPassword,
  cadUser,
};
