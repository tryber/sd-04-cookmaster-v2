require('dotenv').config();

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
  );

  return result.ops[0];
};

const getRecipes = async () => connection().then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
  );

  return true;
};

const removeRecipe = async (id) => {
  await connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return true;
};

const addImage = async (id) => {
  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image: `localhost:3000/images/${id}.jpeg` } }),
  );

  return true;
};

module.exports = {
  getRecipes,
  getRecipeById,
  registerRecipe,
  updateRecipe,
  removeRecipe,
  addImage,
};
