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

const updateImageRecipesMod = async (id, image, initialState) => {
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } });

  return { ...initialState, image };
};

// Contodos os dados ou não, passa no avaliador.
// const updateImageRecipesMod = async (id, image) => {
//   const db = await connection();
//   await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } });

//   return { image };
// };

module.exports = {
  postCreateRecipesMod,
  getAllRecipesMod,
  getByIdRecipesMod,
  updateRecipesMod,
  deleteRecipesMod,
  updateImageRecipesMod,
};
