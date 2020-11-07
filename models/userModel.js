const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findByEmail = async (email) => {
  return connection().then((db) => db.collection('users').findOne({ email }));
};

const findById = async (Id) => {
  if (!ObjectId.isValid(Id)) return null;
  return connection().then((db) => db.collection('users').findOne(ObjectId(id)));
};

const register = async (name, email, password, role) => {
  return connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then(({ insertedId }) => ({ user: { name, email, password, role, _id: insertedId } }));
};

const updateUser = async (Id, { name, lastName, password, email }) => {
  const user = await findById(Id);

  if (!user) return null;

  return connection().then((db) => db.collection('users').updateOne({ _id: ObjectId(Id) }, { $set: { name, lastName, password, email } }));
};

module.exports = {
  findByEmail,
  findById,
  register,
  updateUser,
};
