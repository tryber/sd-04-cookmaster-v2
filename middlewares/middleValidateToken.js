const validateToken = require('../authorization/validateToken');

const validationToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validationToken };
