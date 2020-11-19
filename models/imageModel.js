const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addImage = async (id, image) => {
  const db = await connection();
  await db
    .collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { image } }, { returnOriginal: false });
};

module.exports = addImage;
