const { userService } = require('../services');

const createUserController = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    const user = await userService.createUser(name, email, password, role);

    if (user.message) return res.status(409).json(user);

    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUserController,
};
