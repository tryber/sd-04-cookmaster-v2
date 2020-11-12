const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const auth = async (req, res, next) => {
  try {
    const secret = 'cookmasterv2';
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const data = jwt.verify(token, secret);
    const user = await UserModel.findByEmail(data.data.email);

    req.user = user;

    next();
  } catch (_err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { auth };
