const conn = require('./connection');

const create = async ({ name, email, password }, role) => {
  const db = await conn();
  const result = await db.collection('users').insertOne({ name, email, password, role });

  return result.ops[0];
};

const readByEmailPwd = async (email, password) => {
  const db = await conn();

  if (email && password) return db.collection('users').findOne({ email, password });

  return (
    password === undefined
      ? db.collection('users').findOne({ email })
      : db.collection('users').findOne({ password })
  );
};

// (async () => console.log(await readByEmailPwd('erickjacquin@gmail.com', '12345678')))()

module.exports = {
  create,
  readByEmailPwd,
};
