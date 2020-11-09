const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addRecipe = async (name, ingredients, preparation, userId, image) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId, image }),
  );
  return recipe.ops[0];
};

const getAllRecipes = async () => {
  const lista = await connection().then((db) => db.collection('recipes').find({}).toArray());
  return lista;
};

const recipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation, userId, image) => {
  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, userId, image } },
      ),
  );
  return recipeById(id);
};

const deleteRecipe = async (id) => {
  await connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return true;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  recipeById,
  updateRecipe,
  deleteRecipe,
};
