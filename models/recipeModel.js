const { ObjectId } = require('mongodb');
const connection = require('./connection');

const newRecipe = async (name, ingredients, preparation, userId) =>
  connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId })
      .then(({ insertedId }) => ({
        name,
        ingredients,
        preparation,
        userId,
        _id: insertedId,
      })),
  );

const getAllRecipes = async () => connection().then((db) =>
  db.collection('recipes').find({}).toArray());

const findRecipeById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));

const editRecipe = async (id, name, ingredients, preparation, userId) =>
  connection()
    .then((db) =>
      db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
    )
    .then(() => ({
      _id: id,
      name,
      ingredients,
      preparation,
      userId,
    }));

const deleteRecipe = async (id) =>
  connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const uploadImage = async (id, image, initialState) =>
  connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }))
    .then(() => ({ ...initialState, image }));

module.exports = {
  newRecipe,
  getAllRecipes,
  findRecipeById,
  editRecipe,
  deleteRecipe,
  uploadImage,
};
