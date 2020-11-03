require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'cookmasterV2';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  const validToken = jwt.verify(token, secret);

  if (!validToken) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  req.body = { ...req.body, validToken };

  return next();
};

module.exports = validateToken;
