const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Cria uma nova receita-----------------------------------------------------------------------
const createRecipe = async (name, ingredients, preparation, userId) =>
  connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }),
  );

// Lista todas as receitas--------------------------------------------------------------------
const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find().toArray());

// Lista receitas por ID----------------------------------------------------------------------
const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

// Atualiza uma receita-----------------------------------------------------------------------
const updateRecipe = async (id, name, ingredients, preparation) =>
  connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
  );

// Exclui uma receita -------------------------------------------------------------------------
const deleteRecipe = async (id) =>
  (ObjectId.isValid(id)
    ? connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
    : null);

module.exports = { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };
