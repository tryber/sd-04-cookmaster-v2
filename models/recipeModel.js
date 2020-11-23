const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, ingredients, preparation }))
    .then((result) => ({ name, ingredients, preparation, _id: result.insertedId }));

module.exports = { createRecipe };
