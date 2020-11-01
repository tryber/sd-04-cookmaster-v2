const connection = require('./connection');
const { ObjectId } = require('mongodb');

const DB_COLLECTION = 'recipes';

const getRecipeById = async (recipeId) => {
  try {
    if (!ObjectId.isValid(recipeId)) {
      return null;
    }
    const db = await connection();
    const recipe = await db
      .collection(DB_COLLECTION)
      .findOne({ _id: ObjectId(recipeId) });
    return ((recipe) ? recipe : null);
  } catch (error) {
    return process.exit(1);
  }
};

const insertNewRecipe = async (recipeData, userId) => {
  try {
    const db = await connection();
    const { ops } = await db.collection(DB_COLLECTION).insertOne({ ...recipeData, userId });
    return { recipe: ops[0] };
  } catch (error) {
    return process.exit(1);
  }
};

const listAllRecipes = async () => {
  try {
    const db = await connection();
    const recipesList = await db.collection(DB_COLLECTION).find().toArray();
    return recipesList;
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = {
  getRecipeById,
  insertNewRecipe,
  listAllRecipes,
};
