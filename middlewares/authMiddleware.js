const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const JWT_SECRET = 'cookmasterv2émuitobom';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.getUserByEmail(payload.email);

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = authMiddleware;
