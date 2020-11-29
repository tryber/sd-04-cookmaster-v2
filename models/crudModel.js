const { ObjectId } = require('mongodb');
const connection = require('./connection');

// CRUD feito com auxilio de Lucas Ribas e baseado em apresentações de alunos.

const findById = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
  .then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const findByEmail = async (collection, email) =>
  connection()
    .then((db) => db.collection(collection).findOne({ email }));

const findAll = async (collection) =>
  connection()
    .then((db) => db.collection(collection).find().toArray());

const create = async (collection, query) => {
  const result = await connection()
    .then((db) => db.collection(collection).insertOne(query));
  return result.ops[0];
};

const update = async (collection, id, query) =>
  connection()
    .then((db) => db.collection(collection).updateOne(
      { _id: ObjectId(id) },
      { $set: query },
    ));

const deleteData = async (collection, id) =>
  connection()
    .then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));

module.exports = {
  findById,
  findByEmail,
  findAll,
  create,
  update,
  deleteData,
};
