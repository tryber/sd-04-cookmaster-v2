const jwt = require('jsonwebtoken');

const headers = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const secret = 'danielPantalenaSecret';

const signToken = (payload) => jwt.sign(payload, secret, headers);

const verifyToken = (req, res, next) => {
  const { required, user } = req;
  const token = req.headers.authorization;
  if (!required || user) return next();
  if (!token && required) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  return res.status(401).json({ message: 'jwt malformed' });
};

// const validateToken = (required = true) => (req, _res, next) => {
//   if (!required) {
//     req.required = false;
//     return next();
//   }
//   try {
//     const token = req.headers.authorization;
//     req.required = required;
//     const user = jwt.verify(token, secret);
//     req.user = user;
//     return next();
//   } catch (_err) {
//     return next();
//   }
// };

const validateToken = (required = true) => (req, res, next) => {
  if (!required) {
    req.required = false;
    return next();
  }
  req.required = true;
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const user = jwt.verify(token, secret);
    req.user = user;
    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { signToken, verifyToken, validateToken };
