const connection = require('./models/connection');

connection().then((db) =>
  db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }));
