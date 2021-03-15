const conn = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (recipe) => {
  try {
    const db = await conn();
    const result = await db.collection('recipes').insertOne(recipe);

    return result.ops[0];
  } catch (error) {
    return null;
  }
};

const getAll = async () => {
  try {
    const db = await conn();
    return await db.collection('recipes').find({}).toArray();
  } catch (error) {
    return null;
  }
};

const getOne = async (id) => {
  try {
    const db = await conn();
    return await db.collection('recipes').findOne(ObjectId(id));
  } catch (error) {
    return null;
  }
};

const update = async (id, recipe) => {
  try {
    const db = await conn();
    return await db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: recipe },
    );
  } catch (error) {
    return null;
  }
};

const remove = async (id) => {
  try {
    const db = await conn();
    return await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  } catch (error) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
  getOne,
  update,
  remove,
};
