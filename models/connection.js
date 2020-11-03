const mongoClient = require('mongodb').MongoClient;

const DB_URL = 'mongodb://localhost:27017/Cookmaster'; // Roda Projeto Local
// const DB_URL = 'mongodb://mongodb:27017/Cookmaster'; // Roda Projeto evaluetor

const DB_NAME = 'Cookmaster';

const connection = async () =>
  mongoClient
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connect) => connect.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

module.exports = connection;
