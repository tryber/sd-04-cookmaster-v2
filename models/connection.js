const mongoClient = require('mongodb').MongoClient;
require('dotenv');

let schema = null;
const URL = 'mongodb://localhost:27017/Cookmaster' || process.env.MONGO_DB_URL;
async function connection() {
  if (schema) return Promise.resolve(schema);
  return mongoClient
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(process.env.DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
module.exports = connection;
