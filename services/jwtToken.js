const JWT = require('jsonwebtoken');

const secret = 'The srecret chamber';

const create = (data) => {
  const options = {
    expiresIn: '30m',
    algorithm: 'HS256',
  };
  return JWT.sign({ data }, secret, options);
};

const verify = (token) => JWT.verify(token, secret, (err, decoded) => (err ? null : decoded));

module.exports = { create, verify };
