const jwt = require('jsonwebtoken');

const secret = 'dev2020';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!jwt.verify(token, secret)) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    next();
  } catch (_e) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

const validateExistsToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  next();
};

module.exports = { validateJWT, validateExistsToken };
