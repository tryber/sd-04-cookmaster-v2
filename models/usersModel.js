const conn = require('./connection');

const create = async (name, email, password, role) => {
  const db = await conn();
  const result = await db.collection('users').insertOne({ name, email, password, role });

  return result.ops[0];
};

const readByEmail = async (email) => {
  const db = await conn();

  return db.collection('users').findOne({ email });
};

// (async () => console.log(await create({ name: 'danilo' })))()

module.exports = {
  create,
  readByEmail,
};
