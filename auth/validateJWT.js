const jwt = require('jsonwebtoken');

const secret = 'segredo que deveria estar em uma variavel de ambiente';

module.exports = (required = true) => (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, secret);
    req.user = user;
    return next();
  } catch (_) {
    if (!required) return next();
    res.status(401).json({ message: 'jwt malformed' });
  }
};
