const jwt = require('jsonwebtoken');

const secret = 'mysecrettoken';

const validate = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const data = jwt.verify(token, secret);

    if (!data) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validate };
