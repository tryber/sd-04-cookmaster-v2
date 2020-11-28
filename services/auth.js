require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'cookmasterV2';

const createToken = (payload) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: '12h',
  };
  const token = jwt.sign(payload, secret, options);

  return token;
};

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const validToken = jwt.verify(token, secret);

    if (!validToken) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    req.user = validToken;
    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateToken, createToken };
