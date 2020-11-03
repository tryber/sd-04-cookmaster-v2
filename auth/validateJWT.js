const jwt = require('jsonwebtoken');

const secret = 'projectcookmasterv2';

const validateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const data = jwt.verify(token, secret);

    console.log(data);

    if (!data) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
