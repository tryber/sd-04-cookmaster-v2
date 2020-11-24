const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getById = async (id) => {
  const db = await connection();
  return db.collection('recipes').findOne(ObjectId(id));
};

const add = async (name, ingredients, preparation, userId) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId: ObjectId(userId) }));
  const recipe = Object.fromEntries(
    Object.entries(result.ops[0]).sort(),
  );
  return recipe;
};

const addImage = async (id, imagePath) => {
  const db = await connection();
  return db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image: imagePath } });
};

const update = async (id, name, ingredients, preparation) => {
  const db = await connection();
  return db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
};

const del = async (id) => {
  const db = await connection();
  return db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  add,
  addImage,
  del,
  getAll,
  getById,
  update,
};
