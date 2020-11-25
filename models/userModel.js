const connetion = require('./connection'); // importando a conexão com o banco de dados

const addUser = async (name, email, password) => {
  const result = await connetion().then((db) =>
    db.collection('users').insertOne({ name, email, password }),
  );
  return result.ops[0];
};

const findEmail = async (email) => {
  const result = await connetion().then((db) => db.collection('users').findOne({ email }));
  return result;
};

module.exports = { addUser, findEmail };
