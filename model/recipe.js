const connection = require('../helpers/connection');

/** Errors */
// const FAIL = { message: 'Failed to save', code: 500 };

const create = (recipe) =>
  connection()
    .then(async (schema) => schema.collection('recipes').insertOne(recipe))
    .then((result) => result.ops[0]);

const recipe = (recipeId) =>
  connection().then((schema) => schema.collection('recipes').findOne({ _id: recipeId }));

const recipes = () =>
  connection().then(async (schema) => schema.collection('recipes').find().toArray());

const updateRecipe = (productId, productUpdate) => {
  const { name, ingredients, preparation } = productUpdate;

  return connection().then((db) =>
    db
      .collection('products')
      .findOneAndUpdate(
        { _id: productId },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
      ));
};

module.exports = { create, recipe, recipes, updateRecipe };
