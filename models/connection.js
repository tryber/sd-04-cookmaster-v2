const mongoClient = require('mongodb').MongoClient;

const DB_NAME = 'Cookmaster';

// Local
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// Online
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

let schema;
let conn;

module.exports = async () => {
  try {
    if (schema) return Promise.resolve(schema);

    conn = await mongoClient.connect(
      MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    );
    schema = conn.db(DB_NAME);

    return schema;
  } catch (_e) {
    process.exit(1);
  }
};

// CC :(
// module.exports = async () => {
//   try {
//     return (
//       schema
//         ? Promise.resolve(schema)
//         : (
//             conn = await mongoClient.connect(
//               MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }
//             ),
//             schema = conn.db(DB_NAME)
//           )
//     );
//   } catch (_e) {
//     process.exit(1);
//   }
// };
