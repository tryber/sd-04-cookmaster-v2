const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connection().then((db) => db.collection('recipes').find().toArray());


const getRecipeById = async (Id) => {
  if (!ObjectId.isValid(Id)) return null;
  return connection().then((db) => db.collection('recipes').findOne(ObjectId(Id)));
};

const newRecipeInsert = async ({ name, ingredients, preparation, userId }) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then(({ insertedId }) => (
      { recipe: { name, ingredients, preparation, userId, _id: insertedId } }
      ));

const updateRecipeModel = async (Id, name, ingredients, preparation) => {
  const product = await getRecipeById(Id);

  if (!product) return null;

  await connection().then((db) => db.collection('recipes').updateOne({ _id: ObjectId(Id) }, { $set: { name, ingredients, preparation } }));
  return getRecipeById(Id);
};

const deleteModel = async (recipeId) => {
  let result = {};
  result = await getRecipeById(recipeId);
  if (!result) return null;

  return connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(recipeId) }));
};

const updateImageModel = async (id, image, recipe) => {
  await connection().then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }));

  return { ...recipe, image };
};

module.exports = {
  getAll,
  getRecipeById,
  newRecipeInsert,
  updateRecipeModel,
  deleteModel,
  updateImageModel,
};
