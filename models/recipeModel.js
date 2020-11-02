const connection = require('./connection');

const newRecipe = async (name, ingredients, preparation, userId) =>
  connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId })
      .then(({ insertedId }) => ({
        name,
        ingredients,
        preparation,
        userId,
        _id: insertedId,
      })),
  );

const getAllRecipes = async () => connection().then((db) =>
  db.collection('recipes').find({}).toArray());

module.exports = {
  newRecipe,
  getAllRecipes,
};
