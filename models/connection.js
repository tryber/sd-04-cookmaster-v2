const mongoClient = require('mongodb').MongoClient;

const DATABASE_NAME = 'Cookmaster';
//  const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DATABASE_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

module.exports = connection;
