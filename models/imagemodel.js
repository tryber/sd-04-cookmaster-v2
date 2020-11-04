const connection = require('./connection');
const { ObjectID } = require('mongodb');

const getImage = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  return connection().then((db) => db.collection('recipes').findOne(ObjectID(id)));
};

module.exports = { getImage };
