const { verifyToken } = require('../auth/jwt');
const { JWT_MALFORMED } = require('../errors');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;
  const result = verifyToken(authorization);
  if (!result) throw JWT_MALFORMED;
  req.user = result.data;
  next();
};

module.exports = validateToken;
