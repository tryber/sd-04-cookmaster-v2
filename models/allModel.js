const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  return db.then((db) => db.collection('recipes').find().toArray());
};

const getRecipeById = async (Id) => {
  if (!ObjectId.isValid(Id)) return null;
  const db = await connection();
  return db.then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const newRecipeInsert = async (data) => {
  const db = await connection();
  return await db.collection('recipes').insertOne(data);
};

const updateRecipeModel = async (Id, nameRec, ingredients, instructions) => {
  const product = await getRecipeById(Id);

  if (!product) return null;

  await connection().then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { nameRec, ingredients, instructions } }));
  const newProduct = await getRecipeById(Id);
  return newProduct;
};

const deleteModel = async (recipeId) => {
  let result = {};
  result = await getRecipeById(recipeId);
    connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

  if (!result) return null;
  return result;
};

module.exports = {
  getAll,
  getRecipeById,
  newRecipeInsert,
  updateRecipeModel,
  deleteModel,
};
