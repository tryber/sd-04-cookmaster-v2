const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection();
  const recipe = await result
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return recipe.ops[0];
};

const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const editRecipe = async (id, name, ingredients, preparation, userId) => {
  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } }),
  );
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  editRecipe,
};
