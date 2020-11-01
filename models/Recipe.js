const connection = require('./connection');

const DB_COLLECTION = 'recipes';

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
  insertNewRecipe,
  listAllRecipes,
};
