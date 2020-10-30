const connection = require('./connection');

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

module.exports = {
  registerRecipe,
  listRecipesModel,
};
