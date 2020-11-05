const { Db } = require('mongodb');

Db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
