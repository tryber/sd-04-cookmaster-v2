const mongoClient = require('mongodb').MongoClient;
require('dotenv/config');

// const MONGO_DB_URL_TEST = 'mongodb://mongodb:27017/Cookmaster';
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error('Error message (connection): ', err);
      // process.exit(1);
      throw err;
    });

module.exports = connection;
