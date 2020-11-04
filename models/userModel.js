const connection = require('./connection');

const findByEmail = async (emaildig) => {
  const db = await connection();
  const userTable = await db.getTable('users')
    .select([])
    .where('email = :email')
    .bind('email', emaildig)
    .execute();
  const [id, email, password, name, lastName] = await userTable.fetchOne();
  return { id, name, lastName, email, password };
};

const findById = async (Id) => {
  if (!ObjectId.isValid(Id)) return null;
  const db = await connection();
  return db.then((db) => db.collection('users').findOne(ObjectId(id)));

};

const register = async (data) => {
  let result = '';
  const db = await connection();
  result = await db.collection('users').insertOne(data);

  return result.ops[0];
};

const updateUser = async (Id, { name, lastName, password, email }) => {
  const user = await findById(Id);

  if (!user) return null;

  return connection().then((db) => db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: { name, lastName, password, email } } ));
};

module.exports = {
  findByEmail,
  findById,
  isValid,
  register,
  updateUser,
};
