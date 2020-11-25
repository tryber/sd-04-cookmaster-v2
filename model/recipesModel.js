/* eslint-disable function-paren-newline */
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const addRecipe = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }));

const updateRecipe = async (id, name, ingredients, preparation) =>
  connection()
    .then((db) =>
      db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
    )
    .then(() => ({ _id: id, name, ingredients, preparation }));

const deleteRecipe = async (id) =>
  (ObjectId.isValid(id)
    ? connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
    : null);

const findById = async (id) =>
  (ObjectId.isValid(id)
    ? connection().then((db) => db.collection('recipes').findOne(ObjectId(id)))
    : null);

module.exports = {
  getAll,
  addRecipe,
  updateRecipe,
  findById,
  deleteRecipe,
};
