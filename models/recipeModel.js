const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

const addRecipe = async (name, ingredients, preparation) => {
  const dataRecipes = { name, ingredients, preparation };
  const result = await connection().then((db) => db.collection('recipes').insertOne(dataRecipes));
  return result.ops[0];
};

const showRecipes = async () => {
  const result = await connection().then((db) => db.collection('recipes').find({}).toArray());
  return result;
};

const showRecipeByid = async (id)=>{
    const result = await connection().then((db)=> db.collection('recipes').findOne(ObjectId(id)))
    return result;
}

module.exports = { addRecipe, showRecipes, showRecipeByid };
