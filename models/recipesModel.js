const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return result.ops[0];
};

const findAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  // console.log(result);
  return result;
};

const findRecipeId = async (id) => {
  const db = await connection();
  const result = await db.collection('recipes').findOne(ObjectId(id));
  // console.log(result);
  return result;
};

const update = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const result = await db
    .collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );
  return result;
};

const remove = async (id) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = { add, findAll, findRecipeId, update, remove };
