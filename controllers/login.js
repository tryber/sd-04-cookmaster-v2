const createJWT = require('../authentication/createJWT');
const usersService = require('../services/usersService');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const user = await usersService.getByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  console.log(user);
  const { password: userPassword, ...userData } = user;

  const token = createJWT(userData);

  return res.status(200).json({ token });
};
