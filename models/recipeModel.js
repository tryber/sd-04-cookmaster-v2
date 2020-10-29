const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) => db.collection('recipes').find().toArray())
    .catch((err) => {
      throw err;
    });

const getRecipeById = async (id) =>
  connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
    .catch((err) => {
      console.log(err);
      throw err;
    });

const registerRecipe = async (name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
    .catch((err) => {
      throw err;
    });

const deleteRecipe = async (id) =>
  connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
    .catch((err) => {
      throw err;
    });

const editRecipe = async (id, name, ingredients, preparation) => {
  if (!(await getRecipeById(id))) return false;

  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  registerRecipe,
  deleteRecipe,
  editRecipe,
};
