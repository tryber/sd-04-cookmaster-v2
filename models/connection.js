const mongo = require('mongodb').MongoClient;
require('dotenv/config');

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = process.env.DB_NAME || 'Cookmaster';

function connection() {
  return mongo
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
module.exports = connection;
