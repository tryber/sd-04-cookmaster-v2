const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addRecipe = async (name, ingredients, preparation, image, userId) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, image, userId }),
  );
  return recipe.ops[0];
};

const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find({}).toArray());

const recipeById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));

const updateRecipe = async (id, name, ingredients, preparation, image, userId) => {
  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, image, userId } },
      ),
  );
  return recipeById(id);
};

const deleteRecipe = async (id) => {
  console.log('modell delete');
  return connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  addRecipe,
  getAllRecipes,
  recipeById,
  updateRecipe,
  deleteRecipe,
};
