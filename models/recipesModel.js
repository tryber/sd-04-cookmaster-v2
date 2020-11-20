const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) =>
  connection
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = {
  createRecipe,
};
