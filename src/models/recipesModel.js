const { ObjectId } = require('mongodb');
const connection = require('./connection');

const showAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').aggregate({}).toArray());

const createRecipe = async (name, ingredients, preparation, id) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({ name, ingredients, preparation, id });
  return { recipe: newRecipe.ops[0] };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const foundId = await db.collection('recipes').findOne(ObjectId(id));
  return foundId;
};

const updateRecipe = async (id, recipe) => {
  const db = await connection();
  const updatedRecipe = await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: recipe });
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const db = await connection();
  const deletedRecipe = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return deletedRecipe;
};

const updateImageOfRecipe = async (id, image) => {
  const db = await connection();
  const updatedRecipe = await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } });
  return updatedRecipe;
};

module.exports = {
  showAllRecipes,
  createRecipe,
  findById,
  updateRecipe,
  deleteRecipe,
  updateImageOfRecipe,
};
