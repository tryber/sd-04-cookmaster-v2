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

module.exports = {
  showAllRecipes,
  createRecipe,
  findById,
};
