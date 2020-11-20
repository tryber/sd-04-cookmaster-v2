const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = {
  createRecipe,
};
