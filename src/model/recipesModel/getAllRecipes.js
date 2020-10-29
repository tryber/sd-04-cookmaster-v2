const connection = require('../connection');

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const allRecipes = await db.collection('recipes').find({}).toArray();

    return allRecipes;
  } catch (err) {
    console.error('getAllRecipes', err.message);
  }
};

module.exports = getAllRecipes;
