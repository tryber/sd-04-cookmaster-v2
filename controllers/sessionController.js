const jwt = require('../services/createAndVerifyTokenJWT');

const login = (req, res) => res.status(200).json({ token: jwt.createToken(req.user) });

module.exports = {
  login,
};