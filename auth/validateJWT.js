const jwt = require('jsonwebtoken');

const messageJson = { message: 'jwt malformed' };
const secret = 'Cookmaster2';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!jwt.verify(token, secret)) {
      return res.status(401).json(messageJson);
    }
    next();
  } catch (_e) {
    return res.status(401).json(messageJson);
  }
};

module.exports = validateJWT;
