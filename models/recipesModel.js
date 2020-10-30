const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

const postCreateRecipesMod = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const postUsers = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  const { insertedId: _id } = postUsers;
  const result = {
    _id,
    name,
    ingredients,
    preparation,
    userId,
  };

  return result;
};

const getAllRecipesMod = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find({}).toArray();

  return result;
};

const getByIdRecipesMod = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const result = await db.collection('recipes').findOne(ObjectId(id));

  return result;
};

const updateRecipesMod = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const result = await db
    .collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );

  return result.value;
};

const deleteRecipesMod = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const result = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });

  return result;
};

module.exports = {
  postCreateRecipesMod,
  getAllRecipesMod,
  getByIdRecipesMod,
  updateRecipesMod,
  deleteRecipesMod,
};
