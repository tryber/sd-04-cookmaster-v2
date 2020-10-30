const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

const postCreateUsersMod = async (name, email, password) => {
  const db = await connection();
  const postUsers = await db.collection('users').insertOne({ name, email, password });
  const { insertedId: _id } = postUsers;
  const result = {
    name,
    email,
    role: 'user',
    _id,
  };

  return result;
};

const getUserEmailMod = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });

  return result;
};

const getUserByIdMod = async (id) => {
  if (!ObjectId(id)) return null;

  const db = await connection();
  const result = await db.collection('users').findOne(ObjectId(id));

  return result;
};

module.exports = { postCreateUsersMod, getUserEmailMod, getUserByIdMod };
