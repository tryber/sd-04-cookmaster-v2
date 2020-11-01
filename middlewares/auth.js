const jwt = require('jsonwebtoken');
const jwtConfig = require('./jwtConfig');

const generateToken = (data) => {
  const token = jwt.sign(data, jwtConfig.secret, jwtConfig.tokenConfig);
  return token;
};

module.exports = generateToken;
