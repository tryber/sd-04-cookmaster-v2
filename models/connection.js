const mongoClient = require('mongodb').MongoClient;

const DB_NAME = 'Cookmaster';

// Rodar localmente
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// Rodar no avalidador do Github
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

// Configurações do MongoDB
const MONGO_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = async () => {
  try {
    const session = await mongoClient
      .connect(MONGO_DB_URL, MONGO_CONFIG);
    const database = await session.db(DB_NAME);
    return database;
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = connection;
