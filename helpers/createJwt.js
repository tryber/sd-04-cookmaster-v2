const jwt = require('jsonwebtoken');

const secret = 'trybe_project';

module.exports = ({ _id: id, email, role }) => {
  const payload = { id, email, role };
  const headers = { algorithm: 'HS256', expiresIn: '5m' };

  return jwt.sign(payload, secret, headers);
};
