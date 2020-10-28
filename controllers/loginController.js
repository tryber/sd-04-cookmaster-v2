const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'cookmasterv2émuitobom';

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

  const user = await User.getUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  
  const { password: _, ...userWhitoutPass } = user;
  const jwtOpt = {
    algorithm: 'HS256',
    expiresIn: '1m',
  };

  const token = jwt.sign(userWhitoutPass, JWT_SECRET, jwtOpt);

  res.status(200).json({ token });
};

module.exports = { login };
