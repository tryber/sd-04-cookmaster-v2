const connection = require('./connection');

const registerRecipe = async (name, ingredients, preparation, userId) => {
  const data = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
  );

  return data.ops[0];
};

module.exports = {
  registerRecipe,
};
