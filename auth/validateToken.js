const jwt = require('jsonwebtoken');

const secret = "fiz errado antes, triste";

const verifyToken = (req, res, next) => {
  const { required, user } = req;
  const token = req.headers.authorization;

  if (!required || user) return next();
  if (!token && required) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  return res.status(401).json({ message: 'jwt malformed' });
};

const validateToken = (required = true) => (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    req.required = required;
    const user = jwt.verify(token, secret);
    req.user = user;
    return next();
  } catch (_) {
    return next();
  }
};

module.exports = {
  verifyToken,
  validateToken,
};
