const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
  );

  return result.ops[0];
};

const getRecipes = async () => {
  const products = await connection().then((db) => db.collection('recipes').find().toArray());
  return products;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const backData = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return backData;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
  );
};

const removeRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return true;
};

const updateImageRecipe = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }),
  );
};

module.exports = {
  addRecipe,
  getRecipes,
  findById,
  updateRecipe,
  removeRecipe,
  updateImageRecipe,
};
