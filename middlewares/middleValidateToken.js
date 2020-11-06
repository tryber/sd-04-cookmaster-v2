const jwt = require('jsonwebtoken');
const secret = require('../authorization/secret');
const validateToken = require('../authorization/validateToken');

const validationToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // Verifica se o token existe
    if (!token) return res.status(401).json({ message: 'missing auth token' });

    if (!jwt.verify(token, secret)) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const user = await validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validationToken };
