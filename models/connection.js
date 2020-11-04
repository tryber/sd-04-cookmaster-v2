const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const MONGO_DB_URL = process.env.DB_URL || 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const connection = () => (
  mongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => err)
);

module.exports = connection;
