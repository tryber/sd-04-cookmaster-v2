const jwt = require('jsonwebtoken');
const auth = require('../authentication/createJWT');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, auth.secret);
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }

  const { _id: userId } = jwt.verify(token, auth.secret);
  req.user = userId;
  next();
};
