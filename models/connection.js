const mongoClient = require('mongodb').MongoClient;

const DB_NAME = 'Cookmaster';

// Local
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// Online
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

let schema;

module.exports = async () => {
  try {
    if (schema) return Promise.resolve(schema);

    const conn = await mongoClient.connect(
      MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    );

    return (schema = conn.db(DB_NAME));
  } catch (_) {
    process.exit(1);
  }
};
