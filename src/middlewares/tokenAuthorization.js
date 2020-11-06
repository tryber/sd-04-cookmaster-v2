const JWT = require('jsonwebtoken');
const secretKey = require('../auth/secretKey');
const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const payload = JWT.verify(authorization, secretKey);

    const user = await userModel.findUserById(payload.userId);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};
