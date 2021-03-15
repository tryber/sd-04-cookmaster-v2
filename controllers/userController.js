const User = require('../models/User');

const add = async (req, res) => {
  try {
    const objUser = {
      role: req.url === '/admin' ? 'admin' : 'user',
      ...req.body
    };

    const user = await User.add(objUser);

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

module.exports = {
  add,
};
