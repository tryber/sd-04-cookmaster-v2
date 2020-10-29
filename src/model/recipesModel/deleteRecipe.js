const { ObjectId } = require('mongodb');
const connection = require('../connection');

const deleteRecipeModel = async (id) => {
  try {
    if (ObjectId.isValid(id)) {
      const db = await connection();
      await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
    }

    return null;
  } catch (err) {
    console.error('deleteRecipeModel', err.message);
  }
};

module.exports = deleteRecipeModel;
