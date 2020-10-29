const connection = require('../connection');

const getAllRecipesModel = async () => {
  try {
    const db = await connection();
    const allRecipes = await db.collection('recipes').find({}).toArray();

    return allRecipes;
  } catch (err) {
    console.error('getAllRecipesModel', err.message);
  }
};

module.exports = getAllRecipesModel;
