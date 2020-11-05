const connection = require('./models/connection');

const userAdmin = { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };

const add = async (name, email, password, role) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({ name, email, password, role });
  return result.ops[0];
};

module.exports = { userAdmin, add };
