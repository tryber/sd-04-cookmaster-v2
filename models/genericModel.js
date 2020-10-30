const { ObjectId } = require('mongodb');
const { INVALID_ENTRIES } = require('../errors');
const connection = require('./connection');

const getBy = (collection, field, info) => connection()
  .then((db) => db.collection(collection).findOne({ [field]: info }));

const getAll = (collection) => connection()
  .then((db) => db.collection(collection).find({}).toArray());

const addNew = (collection, info) => connection()
  .then((db) => db.collection(collection).insertOne(info))
  .then(((result) => result.ops[0]));

const update = (collection, id, info) => {
  if (!ObjectId.isValid(id)) throw INVALID_ENTRIES;
  return connection().then((db) => db.collection(collection)
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: info }, { returnOriginal: false }));
};

module.exports = { getBy, addNew, getAll, update };
