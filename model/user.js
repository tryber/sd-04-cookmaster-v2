const connection = require('../helpers/connection');

const create = (user) =>
  connection()
    .then(async (schema) => {
      const userInfo = await schema.collection('users').findOne({ email: user.email });

      if (userInfo) throw new Error('Email already registered');

      return schema.collection('users').insertOne(user);
    })
    .then((result) => result.ops[0]);

module.exports = { create };
