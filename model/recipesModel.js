const connection = require('../model/connection');

const addRecipe = async (name, ingredients, preparation) => {
  console.log('entrou no model');
  const registerResult = await connection().then((db) =>
    db.collection('recipes').insertOne({ recipe: { name, ingredients, preparation } }),
  );
  return registerResult.ops[0];
};

module.exports = { addRecipe };
