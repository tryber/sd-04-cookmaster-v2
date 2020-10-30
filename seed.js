/* db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }); */
const registerUserAdmin = async () => {
  const data = await connection().then((db) =>
    db
      .collection('users')
      .insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }),
  );

  return data.ops[0];
};
