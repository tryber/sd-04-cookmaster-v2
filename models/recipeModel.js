const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerRecipe = async (name, ingredients, preparation, userId) => {
  const data = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
  );

  return data.ops[0];
};

const listRecipesModel = async () => {
  const data = await connection().then((db) => db.collection('recipes').find({}).toArray());
  return data;
};

const listRecipesById = async (id) => {
  try {
    const data = await connection().then((db) =>
      db
        .collection('recipes')
        .find({ _id: ObjectId(id) })
        .toArray(),
    );
    return data[0];
  } catch (err) {
    return 'error';
  }
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const myQuery = { _id: ObjectId(id) };
  const newValues = { $set: { name, ingredients, preparation } };

  await connection().then((db) => db.collection('recipes').updateOne(myQuery, newValues));
};

const deleteRecipe = async (id) => {
  await connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }, (err) => {
      if (err) throw err;
      console.log('1 document deleted');
    }),
  );
};

const insertImage = async (id, url) => {
  const myQuery = { _id: ObjectId(id) };
  const newValues = { $set: { image: url } };

  await connection().then((db) => db.collection('recipes').updateOne(myQuery, newValues));
};

module.exports = {
  registerRecipe,
  listRecipesModel,
  listRecipesById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};
