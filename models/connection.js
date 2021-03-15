const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/Cookmaster';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((error) => {console.log('PAU DE CONEXÃO', error); process.exit(1)});

module.exports = connection;