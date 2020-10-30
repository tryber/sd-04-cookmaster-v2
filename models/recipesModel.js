const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findAll = async () => {
  const db = await connection();
  const stmt = await db.collection('recipes').find().toArray();
  return stmt;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const stmt = await db.collection('recipes').findOne(ObjectId(id));
  return stmt;
};

const findByName = async (name) => {
  const db = await connection();
  const stmt = await db.collection('recipes').findOne({ name });
  return stmt;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const user = await db.collection('recipes').insertOne({ name, ingredients, preparation, userId });
  // Remover a senha do objeto de retorno.
  const { password: __, ...newUser } = user.ops[0];
  // Retornar ultimo usuário cadastrado sem a senha
  return newUser;
};

const updateRecipe = async (id, recipe) => {
  const db = await connection();
  const stmt = await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: recipe });
  return stmt;
};

const updateImageRecipe = async (id, image) => {
  const db = await connection();
  const stmt = await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } });
  return stmt;
};

const deleteRecipe = async (id) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  findAll,
  findById,
  createRecipe,
  findByName,
  updateRecipe,
  deleteRecipe,
  updateImageRecipe,
};
