const connection = require('../connection');

const createRecipeModel = async (recipe, userId) => {
  try {
    const db = await connection();
    const recipeCreate = await db.collection('recipes').insertOne({ ...recipe, userId });

    return { recipe: recipeCreate.ops[0] };
  } catch (err) {
    console.error('createRecipeModel', err.message);
  }
};

module.exports = createRecipeModel;
