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

module.exports = {
  add,
  getAll,
  findById,
};
