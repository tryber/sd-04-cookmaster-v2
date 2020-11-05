const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const getById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const add = async (name, ingredients, preparation, userId) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return result.ops[0];
};

const update = async (id, name, ingredients, preparation) => {
  connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
};

module.exports = {
  add,
  getAll,
  getById,
  update,
};
