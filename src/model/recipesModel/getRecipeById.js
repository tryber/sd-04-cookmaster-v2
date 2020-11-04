const { ObjectId } = require('mongodb');
const connection = require('../connection');

const getRecipeByIdModel = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return null;

    const db = await connection();
    const recipe = await db.collection('recipes').findOne(ObjectId(id));

    return recipe;
  } catch (err) {
    console.error('getRecipeByIdModel', err.message);
  }
};

module.exports = getRecipeByIdModel;
