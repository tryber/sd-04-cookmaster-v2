const jwt = require('jsonwebtoken');
const auth = require('../authentication/createJWT');

module.exports = (required = true) => (req, res, next) => {
  try {
    const token = req.headers.authorization || null;
    if (!required) return next();
    jwt.verify(token, auth.secret);
    const { _id: userId } = jwt.verify(token, auth.secret);
    req.user = userId;
    return next();
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};
