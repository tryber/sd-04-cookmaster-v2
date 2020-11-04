const connection = require('./connection');
const { ObjectId } = require('mongodb');

const DB_COLLECTION = 'recipes';

const deleteRecipeById = async (recipeId) => {
  try {
    const db = await connection();
    await db
      .collection(DB_COLLECTION)
      .deleteOne({ _id: ObjectId(recipeId) });
    return;
  } catch (error) {
    console.log(error.message);
    return process.exit(1);
  }
};

const getRecipeById = async (recipeId) => {
  try {
    if (!ObjectId.isValid(recipeId)) {
      return null;
    }
    const db = await connection();
    const recipe = await db
      .collection(DB_COLLECTION)
      .findOne({ _id: ObjectId(recipeId) });
    return recipe;
  } catch (error) {
    return process.exit(1);
  }
};

const insertRecipeImage = async (recipeId, image) => {
  try {
    const db = await connection();
    const result = await db
      .collection(DB_COLLECTION)
      .updateOne({ _id: ObjectId(recipeId) }, { $set: { image } });
    return result;
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

const updateRecipeById = async (recipeInfo, recipeId) => {
  if (!ObjectId.isValid(recipeId)) {
    return null;
  }
  try {
    const db = await connection();
    await db
      .collection(DB_COLLECTION)
      .updateOne({ _id: ObjectId(recipeId) }, { $set: recipeInfo });
    const result = await getRecipeById(recipeId);
    return result;
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = {
  deleteRecipeById,
  getRecipeById,
  insertRecipeImage,
  insertNewRecipe,
  listAllRecipes,
  updateRecipeById,
};
