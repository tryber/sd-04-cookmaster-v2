const jwt = require('jsonwebtoken');

const secret = 'SoLongAndThanksForAllTheFish';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const data = jwt.verify(token, secret);
    if (!data) {
      return res.status(401).json({ message: 'Erro ao procurar usuario do token' });
    }

    req.user = data;
    return next();
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { authMiddleware };
