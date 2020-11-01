const { ObjectId } = require('mongodb');
const connection = require('./connection');

const loginCheck = async (mail, password) => {
  const result = await connection().then((db) =>
    db.collection('users').findOne({ email: mail, password }));
  return result;
};

const createToken = async (token) => {
  const check = await connection().then((db) => db.collection('login').findOne());
  if (check !== null) {
    const { _id } = check;
    await connection().then((db) =>
      db.collection('login').updateOne({ _id: ObjectId(_id) }, { $set: { token } }));
  }
  await connection().then((db) => db.collection('login').insertOne({ token }));
};

const checkToken = async () => {
  const result = await connection().then((db) => db.collection('login').findOne());
  return result.token;
};

module.exports = {
  loginCheck,
  createToken,
  checkToken,
};
