const jwt = require('jsonwebtoken');
const secret = require('../auth/secret');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'missing auth token' });
    const user = jwt.verify(authorization, secret);

    req.user = user;
    return next();
  } catch (_err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};
