const connection = require('../helpers/connection');

/** Errors */
// const FAIL = { message: 'Failed to save', code: 500 };

const create = (recipe) =>
  connection()
    .then(async (schema) => schema.collection('recipes').insertOne(recipe))
    .then((result) => result.ops[0]);

const recipe = (field, data) =>
  connection().then((schema) => schema.collection('recipes').findOne({ [field]: data }));

const recipes = () =>
  connection().then(async (schema) => schema.collection('recipes').find().toArray());

module.exports = { create, recipe, recipes };
