const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = 'opaopaopa!';

module.exports = async (req, res) => {
  const email = req.body;
  const password = req.body;

  if(!email || !password) return res.send(401);

  const user = await User.findByEmail(email);
  if(!user || user.password !== password) {
    res.statur(401).json({ message: ''});
  }

  const signOptions = {
    algorithm: 'HS256',
    expiresIn: '15m'
  };

  const { password: _, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, JWT_SECRET, signOptions);
  
  res.status(200).json({ token });
}