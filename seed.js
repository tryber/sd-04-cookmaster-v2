const { addNew } = require('./models/genericModel');

addNew('users', { name: 'Admin ta ON', email: 'root', password: 'admin', role: 'admin' });
