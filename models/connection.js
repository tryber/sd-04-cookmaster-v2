const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

let url = 'mongodb://mongodb:27017/Cookmaster';

if (process.env.LOCAL_MONGO_DB_URL) {
  url = process.env.LOCAL_MONGO_DB_URL;
}
const DB_NAME = 'Cookmaster';

const connection = () =>
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
