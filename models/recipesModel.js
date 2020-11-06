const { ObjectId } = require('mongodb');
const connection = require('./connection');

// cadastra uma receita
const add = async (name, ingredients, preparation, userId) => {
  const result = await connection().then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return result.ops[0];
};

// lista todas as receitas
const getAll = async () => {
  const result = await connection().then((db) => db.collection('recipes').find().toArray());
  return result;
};

// lista uma receita específica
const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return result;
};

// edita uma receita
const update = async (id, name, ingredients, preparation) => {
  await connection().then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
};

// deleta uma receita
const remove = async (id) => {
  await connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  add,
  getAll,
  findById,
  update,
  remove,
};
