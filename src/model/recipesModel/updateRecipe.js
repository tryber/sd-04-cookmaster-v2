const { ObjectId } = require('mongodb');
const connection = require('../connection');

const updateRecipeModel = async ({ name, ingredients, preparation }, id) => {
  try {
    const db = await connection();

    await db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  } catch (err) {
    console.error('updateRecipeModel', err.message);
  }
};

module.exports = updateRecipeModel;
