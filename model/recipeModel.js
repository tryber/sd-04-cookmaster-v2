const connection = require('./connection');

const RECIPES = 'recipes';

const adicionarReceita = async (_id, name, ingredients, preparation) => {
  const userId = _id;
  const result = await connection().then((db) =>
    db.collection(RECIPES).insertOne({ userId, name, ingredients, preparation }),
  );

  return result.ops[0];
};

const getAll = async () => connection().then((db) => db.collection(RECIPES).find().toArray());

module.exports = {
  getAll,
  adicionarReceita,
};
