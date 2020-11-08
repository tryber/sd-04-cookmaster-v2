const usersService = require('../services/usersService');
const auth = require('../authentication/createJWT');

const add = ('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await usersService.getByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const user = await usersService.add(name, email, password);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    return res.status(201).json({ user });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

const getAll = ('/', async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json({ users });
});

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const user = await usersService.getByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  const { password: _, ...userData } = user;

  const token = auth.createJWT(userData);

  return res.status(200).json({ token });
};

module.exports = {
  add,
  getAll,
  login,
};
