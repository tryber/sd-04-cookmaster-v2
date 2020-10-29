const jwt = require('jsonwebtoken');

const secret = 'Cookmaster';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const data = jwt.verify(token, secret);

    if (!data) {
      return res.status(500).json({ message: 'token invalido' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'token invalido' });
  }
};

module.exports = validateJWT;
