const mongoClient = require('mongodb').MongoClient;

const DB_NAME = 'Cookmaster';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// push2

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db(DB_NAME))
    .catch((_err) => {
      process.exit(1);
    });

module.exports = connection;
