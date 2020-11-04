const jwt = require('jsonwebtoken');
const { secret } = require('../../config');

const createToken = (payload) => {
  const headers = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, headers);

  return token;
};

module.exports = createToken;
