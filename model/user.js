const connection = require('../helpers/connection');

/** Errors */
const EMAIL_EXISTS = { message: 'Email already registered', code: 409 };

const create = (user) =>
  connection()
    .then(async (schema) => {
      const userInfo = await schema.collection('users').findOne({ email: user.email });

      if (userInfo) throw EMAIL_EXISTS;

      return schema.collection('users').insertOne(user);
    })
    .then((result) => result.ops[0]);

const user = (field, data) =>
  connection().then((schema) => schema.collection('users').findOne({ [field]: data }));

module.exports = { create, user };
