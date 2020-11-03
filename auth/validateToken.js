const jwt = require('jsonwebtoken');
const secret = require('./secret');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const data = jwt.verify(token, secret);
    if (!data) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken;
