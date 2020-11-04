const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllRecipes = async () => {
  // pode tentar then
  try {
    const db = await connection();
    const allRecipes = await db.collection('recipes').find({}).toArray();
    return allRecipes;
  } catch (err) {
    console.log('Error', err);
  }
};

const registerRecipe = async (name, ingredients, preparation) => {
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation }),
  );
  return result.ops[0];
};

const findRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  try {
    const db = await connection();
    const recipe = await db.collection('recipes').findOne(ObjectId(id));
    return recipe;
  } catch (err) {
    console.log('Error', err);
  }
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  try {
    const db = await connection();
    await db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    const result = {
      id,
      name,
      ingredients,
      preparation,
    };
    return result;
  } catch (err) {
    console.log('Error', err);
  }
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  findRecipeById,
  updateRecipe,
};
