const connection = require('./connection');

const getImage = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  return connection().then((db) => db.collection('recipes').findOne(ObjectID(id)));
};

module.exports = { getImage };
