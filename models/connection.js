const mongoClient = require('mongodb').MongoClient;

let schema = null;
const URL = 'mongodb://mongodb:27017/Cookmaster';
async function connection() {
  if (schema) return Promise.resolve(schema);
  return mongoClient
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('Cookmaster'))
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
