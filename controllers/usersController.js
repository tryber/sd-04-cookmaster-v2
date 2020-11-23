const usersService = require('../services/usersService');
const auth = require('../authentication/createJWT');

const createOne = ('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await usersService.readByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const user = await usersService.createOne(name, email, password);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    return res.status(201).json({ user });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

const readAll = ('/', async (req, res) => {
  const users = await usersService.readAll();
  res.status(200).json({ users });
});

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const user = await usersService.readByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  const { password: _, ...userData } = user;

  const token = auth.createJWT(userData);

  return res.status(200).json({ token });
};

module.exports = {
  createOne,
  readAll,
  login,
};
