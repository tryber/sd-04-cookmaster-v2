const jwt = require('jsonwebtoken');

const secret = 'Cookmaster';

const createNewJWT = (payload) => {
  const jwtconfig = {
    expiresIn: '5m',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtconfig);

  return token;
};

module.exports = createNewJWT;
