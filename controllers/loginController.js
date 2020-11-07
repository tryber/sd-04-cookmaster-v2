const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = 'opaopaopa!';

module.exports = async (req, res) => {
  const email = req.body;
  const password = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

  if (emailRegex.test(email)) return res.status(401).json({ message: 'Incorrect username or passeord' });

  const user = await User.findByEmail(email);
  if (!user || user.password !== password) {
    res.status(401).json({ message: 'Incorrect username or passeord' });
  }

  const signOptions = {
    algorithm: 'HS256',
    expiresIn: '15m',
  };

  const { password: _, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, JWT_SECRET, signOptions);

  res.status(200).json({ token });
};
