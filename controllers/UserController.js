const userModel = require('../model/UserModel');
const bcryptjs = require('bcryptjs');

const create = async (request, response) => {
  const { name, email, password } = request.body;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const resultTest = emailRegex.test(email);

  if (!name || !email || !password || !resultTest) {
    return response.status(400).send({ message: 'Invalid entries. Try again.' });
  }

  const userResult = {
    name,
    email,
    password: await bcryptjs.hash(password, 10),
    role: 'user',
  };

  userModel
    .create(userResult)
    .then((result) => response.status(201).send({ user: result }))
    .catch((err) =>
      response.status(409).send({ message: err.message }));
};

module.exports = { create };
