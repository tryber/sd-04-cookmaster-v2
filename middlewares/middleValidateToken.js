const validateToken = require('../authorization/validateToken');

const validationToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const user = validateToken(token);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'token inválido' });
  }
};

module.exports = { validationToken };
