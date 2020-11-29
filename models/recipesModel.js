const { ObjectId } = require('mongodb');

const connect = require('./connect');

const createRecipe = async ({ name, ingredients, preparation, userId }) => connect()
  .then((db) => db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }))
  .then(({ insertedId }) => ({
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  }));

const findAllRecipes = async () => connect()
  .then((db) => db
    .collection('recipes')
    .find({})
    .toArray());

const recipeById = async (id) => connect()
  .then((db) => (ObjectId.isValid(id)
    ? db.collection('recipes').findOne({ _id: ObjectId(id) })
    : null));

const editRecipe = async ({ id, name, ingredients, preparation, userId }) => connect()
  .then((db) => (ObjectId.isValid(id)
    ? db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } })
      .then(() => ({
        _id: id,
        name,
        ingredients,
        preparation,
        userId,
      })) : null));

const deleteRecipe = async (id) => connect()
  .then((db) => (ObjectId.isValid(id)
    ? db
      .collection('recipes')
      .deleteOne({ _id: ObjectId(id) })
    : null));

const editImage = async ({ id, imagePath: image }, recipe) => connect()
  .then((db) => (ObjectId.isValid(id)
    ? db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image } })
      .then(() => ({
        ...recipe,
        image,
      })) : null));

module.exports = {
  editRecipe,
  createRecipe,
  deleteRecipe,
  findAllRecipes,
  recipeById,
  editImage,
};
