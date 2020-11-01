const connection = require('./connection');

const loginCheck = async (mail, password) => {
  const result = await connection().then((db) =>
    db.collection('users').findOne({ email: mail, password }));
  return result;
};

module.exports = {
  loginCheck,
};
