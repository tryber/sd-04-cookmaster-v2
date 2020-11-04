const connection = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (name, ingredients, preparation, userId) => {
  try {
    const db = await connection();
    const addUser = await db.collection('recipes').insertOne({ name, ingredients, preparation, userId });
    return addUser.ops[0];
  } catch (e) {
    return null;
  }
};

const getAll = async () => {
  try {
    const db = await connection();
    const recipes = await db.collection('recipes').find().toArray();
    return recipes;
  } catch (e) {
    return null;
  }
};

const getById = async (id) => {
  try {
    const db = await connection();
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return recipe;
  } catch (e) {
    return null;
  }
};

const update = async (id, name, ingredients, preparation) => {
  try {
    const db = await connection();
    await db.collection('recipes').updateOne(
      { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
    );
    const recipe = await getById(id);
    return recipe;
  } catch (e) {
    return null;
  }
};

const insertUrlImage = async (id, image) => {
  try {
    const db = await connection();
    await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } });
    const recipe = await getById(id);
    return recipe;
  } catch (e) {
    return null;
  }
};

const exclude = async (id) => {
  try {
    const db = await connection();
    await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
    return true;
  } catch (e) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude,
  insertUrlImage,
};
