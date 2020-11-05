const connection = require('./connection');

// cadastra uma receita
const add = async (name, ingredients, preparation, userId) => {
  const result = await connection().then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return result.ops[0];
};

module.exports = {
  add,
};
