const jwt = require('jsonwebtoken');

const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const secret = 'danielPantalenaSecret';

const signToken = (payload) => jwt.sign(payload, secret, headers);

const verifyToken = (req, res, next) => {
  const { user } = req;
  const token = req.headers.authorization;
  if (user) return next();
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  return res.status(401).json({ message: 'jwt malformed' });
};

const validateToken = (required = true) => (req, _res, next) => {
  if (!required) {
    req.required = false;
    return next();
  }

  const token = req.headers.authorization;
  req.required = required;
  const user = jwt.verify(token, secret);
  req.user = user;
  return next();
};

module.exports = { signToken, verifyToken, validateToken };
