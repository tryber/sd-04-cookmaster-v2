const jwt = require('jsonwebtoken');

const secret = 'dev2020';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!jwt.verify(token, secret)) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
