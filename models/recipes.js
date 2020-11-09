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

const update = async (...data) => {
  if (data.length < 3) {
    await connection().then((db) =>
      db.collection('recipes').updateOne(
        { _id: ObjectId(data[0]) },
        {
          $set: {
            image: data[1],
          },
        },
      ));
  } else {
    await connection().then((db) =>
      db.collection('recipes').updateOne(
        { _id: ObjectId(data[0]) },
        {
          $set: {
            name: data[1],
            ingredients: data[2],
            preparation: data[3],
          },
        },
      ));
  }
};

const del = async (id) => {
  connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  del,
};
