const { userModel } = require('../model');

const newUser = async (req, res) => {
  const userData = req.body;
  userData.role = 'user';

  userModel
    .create(userData)
    .then((response) => res.status(201).send({ user: response }))
    .catch(() => res.status(409).send({ message: 'Email already registered' }));
};

module.exports = { newUser };
