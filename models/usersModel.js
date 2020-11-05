const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('users').find().toArray());

const signUp = async (name, email, password) => {
  const result = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return result.ops[0];
};

const findByMail = async (mail) => {
  const result = await connection().then((db) => db.collection('users').findOne({ email: mail }));
  return result;
};

const getById = async (id) =>
  connection().then((db) => db.collection('users').findOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  signUp,
  findByMail,
  getById,
};
