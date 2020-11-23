const jwt = require('jsonwebtoken');
const auth = require('../authentication/createJWT');

module.exports = (req, res, next) => {
  const { token } = req;
  try {
    jwt.verify(token, auth.secret);
    const { _id: userId, role: userRole } = jwt.verify(token, auth.secret);
    req.user = { userId, userRole };
    return next();
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};
