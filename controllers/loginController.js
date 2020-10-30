const rescue = require('express-rescue');

const jwt = require('jsonwebtoken');

const secret = 'cookmasterv2';

const loginUsers = rescue(async (req, res) => {
  const { userWhitoutPass } = req;

  const headers = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign(userWhitoutPass, secret, headers);

  return res.status(200).json({ token });
});

module.exports = { loginUsers };
