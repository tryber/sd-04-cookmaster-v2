const connection = require('./connection');

const dbCollection = 'recipes';

const insertNewRecipe = async (recipeData, userId) => {
  try {
    const db = await connection();
    const { ops } = await db.collection(dbCollection).insertOne({ ...recipeData, userId });
    return { recipe: ops[0] };
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = {
  insertNewRecipe,
};
