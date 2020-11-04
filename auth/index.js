const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validation = require('../utils/validation');
const jwtConfig = require('../utils/configs');

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: validation.MISSING_TOKEN });
  }
  try {
    const decoded = jwt.verify(token, jwtConfig.SECRET);
    const user = await User.findUserByEmail(decoded.data.email);
    if (!user) {
      return res.status(401).json({ message: 'User not found!' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(validation.errMessage(validation.INVALID_TOKEN));
  }
};

module.exports = auth;
