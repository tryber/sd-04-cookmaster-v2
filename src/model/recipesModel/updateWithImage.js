const { ObjectId } = require('mongodb');
const connection = require('../connection');

const updateWithImageModel = async (id, imagePath, recipe) => {
  try {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image: imagePath } });
  } catch (err) {
    console.error('updateWithImageModel', err.message);
  }
};

module.exports = updateWithImageModel;
