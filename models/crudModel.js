const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findById = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return connection()
  .then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const findByName = async (collection, name) =>
connection()
.then((db) => db.collection(collection).findOne({ name }));

const findByEmail = async (collection, email) =>
connection()
.then((db) => db.collection(collection).findOne({ email }));

const findAll = async (collection) =>
  connection()
    .then((db) => db.collection(collection).find().toArray());

const create = async (collection, query) => {
  const result = await connection()
    .then((db) => db.collection(collection).insertOne(query));
  return result.ops[0];
};

const update = async (collection, id, query) =>
  connection()
    .then((db) => db.collection(collection).updateOne(
      { _id: ObjectId(id) },
      { $set: query },
    ));

const deleteData = async (collection, id) =>
  connection()
    .then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));

  // const updateProductQuantity = async (collection, id, quantidade, isSales = false) => {
//   if (isSales) {
//     await connection().then((db) =>
//       db.collection(collection).updateOne({ _id: ObjectId(id) }, { $inc: { quantity: -quantidade } }),
//     );
//   } else {
//     await connection().then((db) =>
//       db.collection(collection).updateOne({ _id: ObjectId(id) }, { $inc: { quantity: +quantidade } }),
//     );
//   }
// };

module.exports = {
  findById,
  findByName,
  findByEmail,
  findAll,
  create,
  update,
  deleteData,
};

// { "_id" : ObjectId("5f46914677df66035f61a355"), "name" : "Erick Jacquin", "email" : "erickjacquin@gmail.com", "password" : "12345678", "role" : "user" }
