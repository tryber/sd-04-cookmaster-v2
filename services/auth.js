const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const authUser = async (req, res, next) => {
  const secret = 'secrecttoken';
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    const decoded = jwt.verify(token, secret);
    const user = await usersModel.findByEmail(decoded.data.email);
    if (!user) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  authUser,
};
