const { userService: { createUser, loginUser } } = require('../services');

const createUserController = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    const user = await createUser(name, email, password, role);

    if (user.message) return res.status(409).json(user);

    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { message, token } = await loginUser(email, password);

    if (message) return res.status(401).json({ message });

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUserController,
  loginUserController,
};
