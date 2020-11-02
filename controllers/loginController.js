const rescue = require('express-rescue');
const createToken = require('../middleware/createToken')

// const jwt = require('jsonwebtoken');
// const secret = 'cookmasterv2';

const loginUsers = rescue(async (req, res) => {
  const { user } = req;

  // const headers = {
  //   expiresIn: '1h',
  //   algorithm: 'HS256',
  // };

  // const token = jwt.sign(userWhitoutPass, secret, headers);

  const { password: _ , ...userWithoutPassword } = user;
  const token = createToken(userWithoutPassword);

  return res.status(200).json({ token });
});

module.exports = { loginUsers };
