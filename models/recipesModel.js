const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const users = await db.collection('recipes').find().toArray();
  return users;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return recipe;
};

const addRecipe = async (name, ingredients, preparation) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  // o OPS retorna todos os objetos que foram inseridos na operação acima.
  // Como só tem 1, pegaremos o de indice 0.
  // so funciona com insertOne. Nao funciona para UpdateOne nem DeleteOne
  return recipe.ops[0];
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
};
