const jwt = require('jsonwebtoken');

const secret = 'Cookmaster';

const createNewJWT = (payload) => {
  const jwtconfig = {
    expiresIn: '14d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtconfig);

  return token;
};

module.exports = createNewJWT;
