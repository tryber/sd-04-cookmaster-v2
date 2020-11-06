const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = 'opaopaopa!';

module.exports = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  if(!userEmail || !userPassword) return res.send(401);

  const user = await User.findByEmail(userEmail);
  if(!user) res.statur(401).json({ message: ''});

  const signOptions = {
    algorithm: 'HS256',
    expiresIn: '15m'
  };
  const { password, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, JWT_SECRET, signOptions);
  
  res.status(200).json({ token });
}