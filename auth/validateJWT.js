const jwt = require('jsonwebtoken');

const messageJson1 = { message: 'jwt malformed' };
const messageJson2 = { message: 'missing auth token' };
const secret = 'Cookmaster2';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!jwt.verify(token, secret)) {
      return res.status(401).json(messageJson2);
    }
    next();
  } catch (_e) {
    return res.status(401).json(messageJson1);
  }
};

const existToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json(messageJson2);
  }
  next();
};

module.exports = { validateJWT, existToken };
