require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'cookmasterV2';

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

module.exports = validateToken;
