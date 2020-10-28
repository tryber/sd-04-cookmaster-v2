const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findAll = async () => {
  const db = await connection();
  const stmt = await db.collection('users').find().toArray();
  return stmt;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const stmt = await db.collection('users').findOne(ObjectId(id));
  return stmt;
};

const findByEmail = async (email) => {
  const db = await connection();
  const stmt = await db.collection('users').findOne({ email });
  return stmt;
};

const createUser = async (name, email, pwd, role = 'user') => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ name, email, password: pwd, role });
  // Remover a senha do objeto de retorno.
  const { password: __, ...newUser } = user.ops[0];
  // Retornar ultimo usuário cadastrado sem a senha
  return newUser;
};

module.exports = {
  findAll,
  findById,
  createUser,
  findByEmail,
};
