const verify = require('../auth/validateToken');

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).json({ message: 'jwt malformed' });
    }
    verify.validateToken(token);
    const { _id } = verify.validateToken(token);
    req.user = _id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  tokenValidation,
};
