const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = 'viniciusVasconcelos-cookmasterV2';

const verifyToken = async (token) => {
  try {
    if (!token) return false;
    const data = jwt.verify(token, secret);
    return await User.findEmail(data.email);
  } catch (error) {
    return null;
  }
};

const createToken = (payload) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  return jwt.sign(payload, secret, jwtConfig);
};

module.exports = {
  createToken,
  verifyToken,
};
