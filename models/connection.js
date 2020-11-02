const mongoClient = require('mongodb').MongoClient;

// const DB_URL = 'mongodb://localhost:27017/Cookmaster'; // Roda Proeto Local
const DB_URL = 'mongodb://mongodb:27017/Cookmaster'; // Roda Projeto evaluetor

const DB_NAME = 'Cookmaster';

const connection = async () => {
  return mongoClient
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connection;
